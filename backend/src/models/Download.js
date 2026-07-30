import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema({
  url_hash: String,
  // Real extractors return a wider set of containers than the original
  // mp4/mp3/webm enum allowed (m4a, opus, 3gp and so on), and a rejected
  // analytics write should never be the reason a download fails.
  format: { type: String, maxlength: 16 },
  quality: { type: String, maxlength: 16 },
  ip_hash: String,
  timestamp: { type: Date, default: Date.now, index: true },
  platform: { type: String, index: true },
});

const Download = mongoose.model("Download", downloadSchema);

export default Download;
