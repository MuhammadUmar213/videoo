import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema({
  url_hash: String,
  format: { type: String, enum: ["mp4", "mp3", "webm"] },
  quality: String,
  ip_hash: String,
  timestamp: { type: Date, default: Date.now },
  platform: String,
});

const Download = mongoose.model("Download", downloadSchema);

export default Download;
