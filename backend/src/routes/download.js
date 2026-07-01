import express from "express";
import Download from "../models/Download.js";

const router = express.Router();

router.post("/fetch-info", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
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
      platform: getPlatformFromUrl(url),
    };

    res.json(mockInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/download", async (req, res) => {
  try {
    const { url, format, quality } = req.body;

    if (!url || !format || !quality) {
      return res
        .status(400)
        .json({ error: "URL, format, and quality are required" });
    }

    await logDownload(url, format, quality, req.ip);

    res.json({
      message: "Download started",
      url,
      format,
      quality,
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
