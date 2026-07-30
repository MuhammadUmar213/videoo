FROM node:22-alpine

WORKDIR /app/backend

# The downloader shells out to yt-dlp, and ffmpeg is what makes 1080p and
# above possible: those resolutions exist only as separate video and audio
# streams that have to be muxed. Without ffmpeg the API correctly hides them,
# so leaving it out silently caps the site at 720p.
#
# Installed from Alpine's repositories rather than the standalone build, which
# is linked against glibc and will not run here. Rebuild the image regularly:
# yt-dlp needs frequent updates to keep working as platforms change.
RUN apk add --no-cache yt-dlp ffmpeg

# Run as the unprivileged user that ships with the image so a process
# compromise does not hand over root inside the container.
RUN chown -R node:node /app
USER node

COPY --chown=node:node package*.json ./

RUN npm install --omit=dev --no-audit --no-fund

COPY --chown=node:node . .

# Railway and most platform hosts inject PORT; the app falls back to 5000.
EXPOSE 5000

CMD ["npm", "start"]
