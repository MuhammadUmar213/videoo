# DownloadAnyVideo Backend

Node.js + Express API for video downloading service.

## Setup

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and update values:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/downloadanyvideo
FRONTEND_URL=http://localhost:3000
```

## Development

```bash
npm run dev
```

API runs on `http://localhost:5000`

## Production

```bash
npm start
```

## API Endpoints

- `POST /api/fetch-info` - Get video information
- `POST /api/download` - Download video
- `GET /api/supported-sites` - List supported platforms
- `GET /api/health` - Health check

## Architecture

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **yt-dlp** - Video extraction (to be integrated)
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **Rate Limiting** - Prevent abuse

## Next Steps

1. ✅ Basic API structure
2. ⬜ yt-dlp integration
3. ⬜ Redis caching
4. ⬜ Authentication (optional)
5. ⬜ Advanced analytics
6. ⬜ Deployment to VPS
