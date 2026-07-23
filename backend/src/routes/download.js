import express from "express";
import Download from "../models/Download.js";

const router = express.Router();
const allowedProtocols = new Set(["http:", "https:"]);
const allowedFormats = new Set(["mp4", "mp3", "webm"]);
const allowedQualities = new Set(["4K", "1080p", "720p", "480p", "360p", "audio"]);

const validateUrl = (url) => {
  if (typeof url !== "string" || !url.trim()) {
    return null;
  }

  try {
    const parsed = new URL(url.trim());
    return allowedProtocols.has(parsed.protocol) ? parsed : null;
  } catch {
    return null;
  }
};

router.post("/fetch-info", async (req, res) => {
  try {
    const { url } = req.body;
    const parsedUrl = validateUrl(url);

    if (!parsedUrl) {
      return res
        .status(400)
        .json({ error: "A valid HTTP or HTTPS URL is required" });
    }

    const mockInfo = {
      id: "mock_" + Date.now(),
      title: "Sample Video Title",
      duration: 600,
      thumbnail: "https://via.placeholder.com/320x180",
      formats: [
        { quality: "4K", format: "mp4" },
        { quality: "1080p", format: "mp4" },
        { quality: "720p", format: "mp4" },
        { quality: "audio", format: "mp3" },
      ],
      platform: getPlatformFromUrl(parsedUrl.href),
    };

    res.json(mockInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/download", async (req, res) => {
  try {
    const { url, format, quality } = req.body;
    const parsedUrl = validateUrl(url);

    if (!parsedUrl || !allowedFormats.has(format) || !allowedQualities.has(quality)) {
      return res
        .status(400)
        .json({ error: "A valid URL, format, and quality are required" });
    }

    await logDownload(parsedUrl.href, format, quality, req.ip);

    res.json({
      message: "Request recorded",
      format,
      quality,
      platform: getPlatformFromUrl(parsedUrl.href),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/supported-sites", (req, res) => {
  const sites = [
    "youtube.com",
    "instagram.com",
    "facebook.com",
    "tiktok.com",
    "twitter.com",
    "x.com",
    "vimeo.com",
    "snapchat.com",
    "pinterest.com",
    "twitch.tv",
  ];
  res.json({ supported_sites: sites, total: sites.length });
});

const getPlatformFromUrl = (url) => {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host.split(".").slice(-2).join(".");
  } catch {
    return "unknown";
  }
};

const logDownload = async (url, format, quality, ip) => {
  await Download.create({
    url_hash: hashString(url),
    format,
    quality,
    ip_hash: hashString(ip),
    platform: getPlatformFromUrl(url),
  });
};

const hashString = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
};

export default router;
