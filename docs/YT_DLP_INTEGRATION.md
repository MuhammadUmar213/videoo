# Next Phase: yt-dlp Integration Guide

## 🎯 Phase 2 Tasks

This document outlines how to add yt-dlp integration to replace mock API responses.

### Step 1: Install yt-dlp & Python

#### Windows

```bash
# Using pip
pip install yt-dlp

# Or using Chocolatey
choco install yt-dlp
```

#### macOS

```bash
brew install yt-dlp
```

#### Linux

```bash
sudo apt-get install yt-dlp
# Or via pip
pip install yt-dlp
```

### Step 2: Create yt-dlp Wrapper

Create `backend/src/utils/ytdlp.js`:

```javascript
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

export const extractVideoInfo = (url) => {
  return new Promise((resolve, reject) => {
    const process = spawn("yt-dlp", [
      "-j", // Output as JSON
      "--no-warnings",
      url,
    ]);

    let output = "";
    let error = "";

    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (data) => {
      error += data.toString();
    });

    process.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(error || "Failed to extract video info"));
        return;
      }

      try {
        const info = JSON.parse(output);
        resolve({
          id: info.id,
          title: info.title,
          duration: info.duration,
          thumbnail: info.thumbnail,
          formats: info.formats.map((f) => ({
            format_id: f.format_id,
            quality: f.height ? `${f.height}p` : "audio",
            ext: f.ext,
            filesize: f.filesize,
            fps: f.fps,
          })),
        });
      } catch (e) {
        reject(new Error("Invalid JSON response from yt-dlp"));
      }
    });
  });
};

export const downloadVideo = (url, format_id) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join("/tmp", `%(title)s.%(ext)s`);

    const args = ["-f", format_id, "-o", outputPath, "--no-warnings", url];

    const process = spawn("yt-dlp", args);

    process.on("close", (code) => {
      if (code !== 0) {
        reject(new Error("Download failed"));
        return;
      }
      resolve({ success: true, message: "Download started" });
    });
  });
};
```

### Step 3: Update Backend Routes

Update `backend/src/routes/download.js`:

```javascript
import { extractVideoInfo, downloadVideo } from "../utils/ytdlp.js";

router.post("/fetch-info", async (req, res) => {
  try {
    const { url } = req.body;
    const info = await extractVideoInfo(url);
    res.json(info);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/download", async (req, res) => {
  try {
    const { url, format_id } = req.body;
    const result = await downloadVideo(url, format_id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### Step 4: Features to Add After yt-dlp

1. **Streaming Downloads** - Stream to client instead of temp file
2. **Progress Tracking** - Real-time download progress
3. **Format Filtering** - Better quality selection UI
4. **Caching** - Redis cache for repeated URLs
5. **Error Handling** - Better error messages
6. **Rate Limiting** - Per-user download limits
7. **Analytics** - Track popular formats/qualities

### Step 5: Production Considerations

- **Docker Image** - Include yt-dlp in Dockerfile
- **Temp Storage** - Use proper temp directory with cleanup
- **Timeout** - Set timeout for long downloads
- **Security** - Validate URLs, prevent command injection
- **Performance** - Queue downloads, limit concurrent operations

### Step 6: Testing

```bash
# Test yt-dlp directly
yt-dlp -j "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

# Test API endpoint
curl -X POST http://localhost:5000/api/fetch-info \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

### Step 7: Docker Update

Update `backend/Dockerfile`:

```dockerfile
FROM node:18-alpine

# Install Python & yt-dlp
RUN apk add --no-cache python3 python3-dev gcc musl-dev linux-headers
RUN pip install yt-dlp

WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000
CMD ["npm", "run", "dev"]
```

## 🎥 Supported Platforms

yt-dlp supports 1000+ sites including:

- ✅ YouTube
- ✅ Instagram
- ✅ Facebook
- ✅ TikTok
- ✅ Twitter/X
- ✅ Vimeo
- ✅ Snapchat
- ✅ Pinterest
- ✅ Twitch
- ✅ And many more...

View full list: `yt-dlp --list-extractors`

## 🔧 Troubleshooting

**Issue:** yt-dlp command not found

- **Solution:** Ensure yt-dlp is installed and in PATH

**Issue:** Downloads timeout

- **Solution:** Increase timeout, use streaming instead of temp files

**Issue:** Permission denied on temp files

- **Solution:** Check directory permissions, use proper temp path

---

**Ready to integrate? Start with Step 1-3 and test locally!**
