# Deployment Guide

## Hostinger

Use one of these two deployment modes. Do not mix them.

### Full app on Hostinger Node.js

Use this when Hostinger will run the Express backend and serve the React build from the same app.

Hostinger settings:

```text
Repository branch: main
Application root: /
Build command: npm install && npm run build
Start command: npm start
Public/output directory: frontend/dist
```

Required environment variables:

```env
NODE_ENV=production
PORT=<Hostinger-provided port, if shown in panel>
MONGODB_URI=mongodb+srv://USER:PASSWORD@HOST/downloadanyvideo?retryWrites=true&w=majority
MONGODB_DB_NAME=downloadanyvideo
FRONTEND_URL=https://YOUR_DOMAIN
VITE_API_URL=/api
RATE_LIMIT_MAX=60
```

Important: production will not start with the local MongoDB URL. Create a MongoDB Atlas database and add its connection string as `MONGODB_URI`.

### Static frontend only

Use this only if the backend is deployed somewhere else.

Hostinger settings:

```text
Application root: frontend
Build command: npm install && npm run build
Output directory: dist
```

Set `VITE_API_URL` to the deployed backend API URL, for example:

```env
VITE_API_URL=https://api.yourdomain.com/api
```

The frontend alone cannot process `/api/download` requests unless a backend is also deployed.

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
FRONTEND_URL=https://vidsavio.com
RATE_LIMIT_MAX=60
```

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

The backend health response should return JSON with `status`, `database`, `timestamp`, `uptime`, and `version`.

## Local Docker

For local development with MongoDB:

```bash
docker-compose up --build
```

Frontend: `http://localhost:3000`

Backend: `http://localhost:5000/api/health`
