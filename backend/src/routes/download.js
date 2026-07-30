import express from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import Download from "../models/Download.js";
import {
  getPlatformFromUrl,
  hashValue,
  parseVideoUrl,
  supportedSites,
} from "../utils/security.js";
import {
  createDownloadStream,
  fetchMetadata,
  isDownloaderAvailable,
} from "../utils/ytdlp.js";

const router = express.Router();

const allowedQualities = new Set([
  "4K",
  "1440p",
  "1080p",
  "720p",
  "480p",
  "360p",
  "240p",
  "audio",
]);

// Transfers are far more expensive than metadata lookups, so they get their
// own, much tighter budget.
const transferLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.DOWNLOAD_RATE_LIMIT_MAX || 10),
  message: { error: "Too many downloads started. Please try again shortly." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/fetch-info", async (req, res, next) => {
  try {
    const parsedUrl = parseVideoUrl(req.body?.url);

    if (!parsedUrl) {
      return res
        .status(400)
        .json({ error: "A valid URL from a supported video platform is required" });
    }

    const info = await fetchMetadata(parsedUrl.href);

    if (!info.formats.length) {
      return res.status(422).json({
        error: "No downloadable formats are available for that video.",
      });
    }

    res.json({ ...info, platform: getPlatformFromUrl(parsedUrl.href) });
  } catch (error) {
    next(error);
  }
});

/**
 * Streams the chosen format to the visitor. This is a GET so the browser can
 * treat it as a file download; the response is piped straight from yt-dlp, so
 * nothing is stored on the server.
 */
router.get("/download", transferLimiter, async (req, res, next) => {
  let child;

  try {
    const parsedUrl = parseVideoUrl(req.query?.url);
    const formatId = req.query?.formatId;
    const container = typeof req.query?.ext === "string" ? req.query.ext : "";
    const quality =
      typeof req.query?.quality === "string" &&
      allowedQualities.has(req.query.quality)
        ? req.query.quality
        : "unknown";

    if (!parsedUrl || typeof formatId !== "string") {
      return res
        .status(400)
        .json({ error: "A valid URL and format are required" });
    }

    child = await createDownloadStream(parsedUrl.href, formatId);

    const extension = /^[a-z0-9]{1,5}$/i.test(container) ? container : "mp4";
    const filename = buildFilename(req.query?.title, extension);

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", contentDisposition(filename));
    res.setHeader("Cache-Control", "no-store");

    logDownload(parsedUrl.href, extension, quality, req.ip);

    const stderr = [];
    child.stderr.on("data", (chunk) => stderr.push(chunk));

    child.stdout.pipe(res);

    child.on("close", (code) => {
      if (code === 0) {
        return;
      }

      console.error("yt-dlp exited", code, Buffer.concat(stderr).toString("utf8"));

      if (!res.headersSent) {
        res.status(502).json({ error: "The download could not be completed." });
      } else {
        // Headers are already out, so the only honest signal left is to cut
        // the response short rather than end it as though it were complete.
        res.destroy();
      }
    });

    // If the visitor navigates away, stop paying to fetch a file nobody wants.
    res.on("close", () => {
      if (!child.killed) {
        child.kill("SIGKILL");
      }
    });
  } catch (error) {
    if (child && !child.killed) {
      child.kill("SIGKILL");
    }
    next(error);
  }
});

router.get("/supported-sites", async (req, res) => {
  res.json({
    supported_sites: supportedSites,
    total: supportedSites.length,
    downloader_available: await isDownloaderAvailable(),
  });
});

const RESERVED_CHARS = new Set(["\\", "/", ":", "*", "?", '"', "<", ">", "|"]);

// Compared by code point rather than a regex literal, so no control character
// ever has to appear in this source file.
const isFilenameSafe = (char) => {
  const code = char.codePointAt(0);
  if (code < 0x20 || code === 0x7f) return false;
  return !RESERVED_CHARS.has(char);
};

export const buildFilename = (title, extension) => {
  const base =
    typeof title === "string" && title.trim()
      ? title.trim().slice(0, 80)
      : "video";

  const safe = Array.from(base)
    .filter(isFilenameSafe)
    .join("")
    .replace(/\s+/g, " ")
    .trim();

  return `${safe || "video"}.${extension}`;
};

export const contentDisposition = (filename) => {
  const ascii = Array.from(filename)
    .map((char) => {
      const code = char.codePointAt(0);
      return code >= 0x20 && code <= 0x7e && char !== '"' ? char : "_";
    })
    .join("");

  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
};

// Analytics only. A database problem should degrade reporting, not take the
// endpoint down or surface a driver error to the caller.
const logDownload = async (url, format, quality, ip) => {
  if (mongoose.connection.readyState !== 1) {
    return;
  }

  try {
    await Download.create({
      url_hash: hashValue(url),
      format,
      quality,
      ip_hash: hashValue(ip),
      platform: getPlatformFromUrl(url),
    });
  } catch (error) {
    console.error("Failed to record download:", error.message);
  }
};

export default router;
