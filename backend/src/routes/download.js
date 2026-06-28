import express from "express";

const router = express.Router();

// Mock endpoint - returns video info
router.post("/fetch-info", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Mock response - replace with yt-dlp integration later
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
      platform: "youtube",
    };

    res.json(mockInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download endpoint
router.post("/download", async (req, res) => {
  try {
    const { url, format, quality } = req.body;

    if (!url || !format || !quality) {
      return res
        .status(400)
        .json({ error: "URL, format, and quality are required" });
    }

    // Log download (for analytics)
    logDownload(url, format, quality, req.ip);

    // Mock response - replace with actual yt-dlp streaming
    res.json({
      message: "Download started",
      url: url,
      format: format,
      quality: quality,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get supported sites
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

// Helper function - log downloads
const logDownload = (url, format, quality, ip) => {
  const logEntry = {
    timestamp: new Date(),
    url_hash: hashString(url),
    format,
    quality,
    ip_hash: hashString(ip),
  };
  // In production, save to MongoDB
  console.log("📥 Download logged:", logEntry);
};

// Simple hash function
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
};

export default router;
