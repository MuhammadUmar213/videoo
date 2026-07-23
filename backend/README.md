# DownloadAnyVideo Backend

Node.js + Express API for the video downloading service.

## Setup

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and update values:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/downloadanyvideo
MONGODB_DB_NAME=downloadanyvideo
MONGODB_MAX_POOL_SIZE=10
FRONTEND_URL=http://localhost:3000
```

For production/business plan deployment, set `NODE_ENV=production` and use a
remote MongoDB connection string:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.example.mongodb.net/downloadanyvideo?retryWrites=true&w=majority
MONGODB_DB_NAME=downloadanyvideo
FRONTEND_URL=https://vidsavio.com
```

## Development

```bash
npm run dev
```

API runs on `http://localhost:5000`.

## Production

```bash
npm start
```

## API Endpoints

- `POST /api/fetch-info` - Get video information
- `POST /api/download` - Start download and save analytics to MongoDB
- `GET /api/supported-sites` - List supported platforms
- `GET /api/health` - Health check with database status

## Architecture

- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- yt-dlp - Video extraction to be integrated
- Helmet - Security headers
- CORS - Cross-origin requests
- Rate Limiting - Prevent abuse

## Next Steps

1. Basic API structure
2. yt-dlp integration
3. Redis caching
4. Authentication, optional
5. Advanced analytics
6. Deployment to VPS or cloud platform
