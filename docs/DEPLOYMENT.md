# Deployment Guide

## Railway (backend)

Railway suits this backend: a persistent process, a real filesystem, and no
execution time limit on a request. The committed `backend/Dockerfile` installs
`yt-dlp` and `ffmpeg`, so the downloader works rather than reporting itself
unconfigured.

### Create the service

In Railway: **New Project → Deploy from GitHub repo**, pick this repository,
then open the service's **Settings**:

```text
Root Directory:  backend
```

That one setting matters. Railway builds from the repository root by default,
where it would not find `backend/Dockerfile` and the `COPY` paths inside it
would resolve against the wrong directory. With the root set, Railway picks up
`backend/railway.json` and `backend/Dockerfile` automatically — builder,
health check and restart policy are already declared there.

### Database

Either add a MongoDB service in the same Railway project and use the connection
string it exposes, or point `MONGODB_URI` at MongoDB Atlas. Production refuses
to start against a localhost URL.

### Variables

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://USER:PASSWORD@HOST/downloadanyvideo?retryWrites=true&w=majority
MONGODB_DB_NAME=downloadanyvideo
HASH_SECRET=<32+ characters, see below>
FRONTEND_URL=https://YOUR_VERCEL_DOMAIN
TRUST_PROXY=1
RATE_LIMIT_MAX=60
DOWNLOAD_RATE_LIMIT_MAX=10
YT_DLP_MAX_CONCURRENT=2
```

Leave `PORT` unset — Railway injects it and the app reads `process.env.PORT`.

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

`FRONTEND_URL` must be the Vercel origin including `https://`. It is the CORS
allowlist, and a mismatch blocks the browser's own API calls.

### Then point the frontend at it

Railway gives the service a public domain under **Settings → Networking**. Set
these in the Vercel project and redeploy the frontend:

```env
VITE_API_URL=https://YOUR_RAILWAY_DOMAIN/api
VITE_DOWNLOAD_URL=https://YOUR_RAILWAY_DOMAIN/api
```

Because the frontend then calls a different origin, the CSP in `vercel.json`
has to allow it: change `connect-src 'self'` to
`connect-src 'self' https://YOUR_RAILWAY_DOMAIN`. Without that the browser
blocks the request before it leaves the page, which looks like a backend
outage and is not.

### Confirm the engine is actually there

```bash
curl https://YOUR_RAILWAY_DOMAIN/api/health
curl https://YOUR_RAILWAY_DOMAIN/api/supported-sites
```

The second response carries `downloader_available`. If it is `false` the
service is running but `yt-dlp` is missing from the image — check the build
log for the `apk add` step. If it is `true`, paste a real link into the site
and the transfer will run.

### Keep yt-dlp current

Platforms change how they serve video, and yt-dlp ships frequent releases to
keep up. A months-old image will start failing on extraction while everything
else looks healthy. Redeploy periodically so the image picks up a newer
package.

## Vercel (frontend) + a separate backend

Vercel is an excellent home for the frontend and a poor one for the
downloader. Serverless functions are not built for this workload:

| Vercel constraint | What the downloader needs |
| --- | --- |
| 60s max duration on Hobby, 800s on Pro with fluid compute | Transfers run for minutes |
| No persistent process | The rate limiter and concurrency cap live in memory and would reset on every cold start |
| 250 MB bundle, read-only filesystem | The `yt-dlp` and `ffmpeg` binaries |
| All traffic is metered bandwidth | Video files, in full, on every download |

So split it:

- **Frontend on Vercel** — static build, global CDN.
- **Backend on a host with a persistent process and binary execution** — a
  VPS, Railway, Render, or Fly.io. This is the same Express app; nothing about
  it changes.

### Vercel project settings

The committed `vercel.json` already builds the frontend. Set one variable:

```env
VITE_API_URL=https://api.YOUR_DOMAIN/api
```

Point it at wherever the backend ends up. Then, on the backend, set
`FRONTEND_URL` to the Vercel domain so CORS lets the browser through.

### Two ways to connect them

**Direct (simplest).** The frontend calls the backend origin straight out.
Requires the CSP in `vercel.json` to allow it — change `connect-src 'self'` to
`connect-src 'self' https://api.YOUR_DOMAIN`, otherwise the browser blocks the
call before it leaves the page.

**Proxied (avoids CORS).** Add a rewrite to `vercel.json` so `/api` is
same-origin, and leave `VITE_API_URL` as `/api`:

```json
{ "source": "/api/:path*", "destination": "https://api.YOUR_DOMAIN/api/:path*" }
```

This one keeps `connect-src 'self'` valid. Note that proxied responses travel
through Vercel and count against its bandwidth, which is why file transfers
should skip it — see below.

### Keep file transfers off the CDN

Whichever option you pick, set this so the actual video bytes go straight from
the backend to the visitor rather than through Vercel's metered bandwidth:

```env
VITE_DOWNLOAD_URL=https://api.YOUR_DOMAIN/api
```

Metadata lookups are small JSON and stay on `VITE_API_URL`. The download itself
is a top-level navigation, so it is not subject to CORS or `connect-src` and
works cross-origin without extra configuration.

### Verify after deploying

```bash
curl -I https://YOUR_VERCEL_DOMAIN/            # 200, HTML
curl https://api.YOUR_DOMAIN/api/health        # {"status":"healthy"}
curl https://api.YOUR_DOMAIN/api/supported-sites | grep downloader_available
```

`downloader_available: false` means the backend is running but `yt-dlp` is not
installed on it — the site will work and the downloader will return a clear
503.

### Frontend-only on Vercel

Deploying just this repo to Vercel with no backend gives you a working site
where every `/api` call 404s: the downloader and the contact form will not
work. That is a valid staging setup, not a launch.

## The downloader needs yt-dlp on the server

Read this before choosing a host. The site has two halves and they have very
different requirements:

- **The site itself** — pages, blog, legal content, contact form. Runs anywhere
  Node runs.
- **The downloader** — shells out to the `yt-dlp` binary and streams the result
  through the server. This needs the ability to execute a binary that is not
  part of the Node install, plus real outbound bandwidth for every transfer.

Without `yt-dlp` on the PATH (or at `YT_DLP_PATH`) the API stays up and every
page works, but `/api/fetch-info` returns a 503 saying the download service is
not configured. That is deliberate — it is better than serving placeholder
results that look real.

`ffmpeg` is optional. Without it only single-file formats are offered, which in
practice means up to 720p on YouTube. 1080p and above exist only as separate
video and audio streams that have to be muxed, and offering them without ffmpeg
would hand the visitor a silent file.

### Shared hosting is likely to be a problem for this part

Managed shared hosting generally does not let you execute arbitrary binaries,
and video transfers are bandwidth-heavy in a way shared plans are not sold for.
Before committing to a shared plan, confirm with the host that you may install
and execute `yt-dlp`, and check the bandwidth terms. A VPS avoids both questions
and is the safer home for the downloader.

Also confirm the host's acceptable-use policy allows this category of service at
all. Hosting providers have removed stream-ripping sites under legal pressure
before, so it is worth a written answer rather than an assumption.

## Hostinger (Business or Cloud plan)

Node.js apps run on the Business and Cloud plans. They are **not** available on
the Single or Premium shared plans — check the plan before starting.

This section covers hosting the site. Whether the downloader half works depends
on the binary and bandwidth questions above.

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
DOWNLOAD_RATE_LIMIT_MAX=10
YT_DLP_PATH=/full/path/to/yt-dlp
FFMPEG_PATH=/full/path/to/ffmpeg
YT_DLP_MAX_CONCURRENT=2
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

### Installing yt-dlp on Hostinger

Hostinger's Node.js deploy runs `npm install`, `npm run build` and `npm start`.
It does not build the Dockerfile, so the `apk add yt-dlp ffmpeg` line in
`backend/Dockerfile` does nothing here — that path only applies to Docker hosts
such as Railway. On Hostinger the binary has to be placed in the account
manually.

SSH is available on Business and above, restricted to the home directory.
That restriction is fine: the app takes an absolute path.

```bash
mkdir -p ~/bin
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ~/bin/yt-dlp
chmod +x ~/bin/yt-dlp
~/bin/yt-dlp --version      # confirms execution is permitted
```

Then set `YT_DLP_PATH=/home/USERNAME/bin/yt-dlp` in the app's variables.

Two things can go wrong, and both are worth checking before assuming the code
is at fault:

- **Execution may be blocked.** Managed shared hosting often refuses to run
  binaries the customer supplied. If `--version` prints nothing or reports
  permission denied, the plan will not support the downloader and the site will
  run with it disabled.
- **The startup cost is real.** The standalone build unpacks itself on every
  invocation, which measured 8-12 seconds locally. `YT_DLP_TIMEOUT_MS` and
  `YT_DLP_STARTUP_MS` already allow for that; do not lower them.

`ffmpeg` is a much larger dependency and unlikely to be installable on shared
hosting. Without it the site works and offers single-file formats only, which
on YouTube means up to 720p. That is a deliberate choice in the code, not a
bug: higher resolutions arrive as separate video and audio streams, and
offering them without a mux would produce silent files.

### After deploying

```bash
curl -I https://YOUR_DOMAIN/                # 200, HTML
curl https://YOUR_DOMAIN/api/health         # {"status":"healthy"}
curl https://YOUR_DOMAIN/api/supported-sites
```

The last response carries `downloader_available`. `false` means the site is up
but `yt-dlp` was not found — check `YT_DLP_PATH` and that the binary runs over
SSH. The first call after a restart can take around ten seconds while the
engine is probed; subsequent calls are immediate.

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
