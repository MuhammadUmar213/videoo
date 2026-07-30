import express from "express";
import mongoose from "mongoose";
import Download from "../models/Download.js";
import {
  getPlatformFromUrl,
  hashValue,
  parseVideoUrl,
  supportedSites,
} from "../utils/security.js";

const router = express.Router();
const allowedFormats = new Set(["mp4", "mp3", "webm"]);
const allowedQualities = new Set(["4K", "1080p", "720p", "480p", "360p", "audio"]);

router.post("/fetch-info", async (req, res, next) => {
  try {
    const { url } = req.body;
    const parsedUrl = parseVideoUrl(url);

    if (!parsedUrl) {
      return res
        .status(400)
        .json({ error: "A valid URL from a supported video platform is required" });
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
    next(error);
  }
});

router.post("/download", async (req, res, next) => {
  try {
    const { url, format, quality } = req.body;
    const parsedUrl = parseVideoUrl(url);

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
    next(error);
  }
});

router.get("/supported-sites", (req, res) => {
  res.json({ supported_sites: supportedSites, total: supportedSites.length });
});

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
