# Deployment Guide

## Hostinger (Business or Cloud plan)

Node.js apps run on the Business and Cloud plans. They are **not** available on
the Single or Premium shared plans — check the plan before starting.

The app deploys as a **single Node process**: Express serves the API under
`/api` and the built React app for every other path, from one domain. No
separate static host and no reverse proxy are needed.

### Before you start

1. **MongoDB Atlas database.** Production refuses to start with a localhost
   MongoDB URL, so create a free Atlas cluster and copy its connection string.
   In Atlas, allow access from anywhere (`0.0.0.0/0`) or from Hostinger's
   outbound IPs, otherwise the connection times out.
2. **Generate a hash secret.** The server will not boot without it:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Deploy from GitHub

In hPanel: **Websites → Add Website → Deploy Web App → Import Git Repository**,
authorise GitHub, then pick this repository.

```text
Branch:            main
Node version:      22.x   (20.x also works; 18.x will FAIL — Vite 7 requires 20.19+)
Application root:  /
Build command:     npm install && npm run build
Start command:     npm start
Entry file:        backend/src/server.js
```

Leave the output/public directory empty, or point it at `frontend/dist`. The
Node process serves those files itself — this is not a static deployment.

### Environment variables

Set these in the app's Environment Variables panel before the first deploy.

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://USER:PASSWORD@HOST/downloadanyvideo?retryWrites=true&w=majority
MONGODB_DB_NAME=downloadanyvideo
HASH_SECRET=<the 64-character value generated above>
FRONTEND_URL=https://YOUR_DOMAIN
TRUST_PROXY=1
RATE_LIMIT_MAX=60
CONTACT_RATE_LIMIT_MAX=5
VITE_API_URL=/api
```

Notes on the ones that are easy to get wrong:

- **`HASH_SECRET` is mandatory and must be at least 32 characters.** Without it
  the process exits at boot on purpose: a missing secret would make the stored
  IP hashes reversible, turning the analytics collection into personal data.
- **`TRUST_PROXY=1`** because Hostinger terminates TLS in front of the app. Set
  it to `0` only if the process is ever exposed directly, otherwise clients can
  forge `X-Forwarded-For` and bypass rate limiting.
- **`FRONTEND_URL`** must be the real public origin including `https://`. It is
  the CORS allowlist; a mismatch blocks the browser's own API calls. Multiple
  origins can be comma-separated.
- **`PORT`** should be left unset unless hPanel assigns one — the app reads
  `process.env.PORT` and falls back to 5000.
- Analytics and ads are off by default. Set `ENABLE_ANALYTICS=true` or
  `ENABLE_ADS=true` to widen the Content-Security-Policy to the Google domains;
  without that the tags are blocked by CSP. For analytics also set
  `VITE_GA_MEASUREMENT_ID` so the tag actually loads.

### After deploying

```bash
curl -I https://YOUR_DOMAIN/                # 200, HTML
curl https://YOUR_DOMAIN/api/health         # {"status":"healthy"}
curl https://YOUR_DOMAIN/api/supported-sites
```

`/api/health` returns `{"status":"healthy"}` when the database is connected and
`503` with `{"status":"degraded"}` when it is not. Detailed uptime and version
fields are intentionally withheld in production.

If the app fails to start, check the deployment log for either
`HASH_SECRET must be set` or `MONGODB_URI must be set to a remote MongoDB
connection string` — those two account for most first-deploy failures.

### Alternative: static frontend only

Use this only if the backend runs somewhere else.

```text
Application root: frontend
Build command:    npm install && npm run build
Output directory: dist
```

Set `VITE_API_URL` to the deployed backend API URL, for example
`https://api.yourdomain.com/api`. The frontend alone cannot serve `/api`
requests, so the downloader and contact form will not work without a backend.

## Google Cloud Run

This repo is set up for two Cloud Run services:

- `vidsavio-api`: Express backend
- `vidsavio-web`: Vite frontend served as static files

### Required production values

Create a MongoDB Atlas database first, then store the connection string in Secret Manager:

```bash
gcloud secrets create MONGODB_URI --replication-policy=automatic
printf "mongodb+srv://USER:PASSWORD@HOST/downloadanyvideo?retryWrites=true&w=majority" | gcloud secrets versions add MONGODB_URI --data-file=-
```

Set these values before deployment:

```bash
gcloud config set project YOUR_PROJECT_ID
gcloud services enable run.googleapis.com cloudbuild.googleapis.com secretmanager.googleapis.com
```

### Deploy with Cloud Build

Update substitutions in `cloudbuild.yaml` if your service names, region, frontend domain, or MongoDB secret name are different.

```bash
gcloud builds submit --config cloudbuild.yaml
```

The pipeline deploys the backend first, reads the real Cloud Run backend URL, and builds the frontend with that URL as `VITE_API_URL`.

### Backend environment

Production backend requirements:

```env
NODE_ENV=production
MONGODB_URI=<stored in Secret Manager>
HASH_SECRET=<stored in Secret Manager, 32+ characters>
FRONTEND_URL=https://vidsavio.com
TRUST_PROXY=1
RATE_LIMIT_MAX=60
```

`HASH_SECRET` is required — the container exits at boot without it.

`FRONTEND_URL` can contain comma-separated origins if you need both a custom domain and a Cloud Run preview URL.

### Frontend environment

For split frontend/backend deployments, build the frontend with:

```env
VITE_API_URL=https://YOUR_BACKEND_URL/api
```

For a single-domain reverse-proxy deployment, use:

```env
VITE_API_URL=/api
```

### Verification

Check these after deployment:

```bash
curl https://YOUR_BACKEND_URL/api/health
curl https://YOUR_FRONTEND_URL
```

In production the health response is `{"status":"healthy"}`, or `503` with
`{"status":"degraded"}` when the database is unreachable. The detailed
`database`, `timestamp`, `uptime` and `version` fields are returned only outside
production, to avoid handing out a free deployment fingerprint.

## Local Docker

For local development with MongoDB:

```bash
docker-compose up --build
```

Frontend: `http://localhost:3000`

Backend: `http://localhost:5000/api/health`
