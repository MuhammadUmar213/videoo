import express from "express";
import mongoose from "mongoose";

const router = express.Router();
const isProduction = process.env.NODE_ENV === "production";

router.get("/health", (req, res) => {
  const healthy = mongoose.connection.readyState === 1;

  // Uptime, versions, and dependency state are useful for debugging but hand
  // an attacker a free fingerprint, so they stay out of production responses.
  if (isProduction) {
    return res.status(healthy ? 200 : 503).json({
      status: healthy ? "healthy" : "degraded",
    });
  }

  res.status(healthy ? 200 : 503).json({
    status: healthy ? "healthy" : "degraded",
    database: healthy ? "connected" : "disconnected",
    timestamp: new Date(),
    uptime: process.uptime(),
    version: "1.0.0",
  });
});

export default router;
