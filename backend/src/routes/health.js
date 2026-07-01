import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date(),
    uptime: process.uptime(),
    version: "1.0.0",
  });
});

export default router;
