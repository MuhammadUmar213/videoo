# Deployment Guide

## 🚀 Deploy to VPS (Self-Hosted)

### Prerequisites

- Ubuntu 20.04+ or similar Linux
- Node.js 18+
- MongoDB
- Nginx (reverse proxy)
- SSL certificate (Let's Encrypt)

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
sudo apt install -y mongodb

# Install Nginx
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

### 2. Clone Project

```bash
cd /var/www
git clone <your-repo-url> downloadanyvideo
cd downloadanyvideo
```

### 3. Install Dependencies

```bash
npm install  # Installs all workspaces
```

### 4. Environment Configuration

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with production values
nano .env

# Frontend
cd ../frontend
cp .env.example .env
# Edit .env with production API URL
nano .env
```

### 5. Build Frontend

```bash
cd frontend
npm run build
```

### 6. Start Services with PM2

```bash
# Start backend
pm2 start "npm run start --workspace=backend" --name downloadanyvideo-api

# Start frontend (serve dist)
pm2 start "npm install -g serve && serve -s frontend/dist -l 3000" --name downloadanyvideo-web

# Save PM2 config
pm2 save
sudo pm2 startup
```

### 7. Nginx Configuration

Create `/etc/nginx/sites-available/downloadanyvideo`:

```nginx
upstream api_backend {
    server localhost:5000;
}

upstream frontend {
    server localhost:3000;
}

server {
    listen 80;
    server_name downloadanyvideo.com www.downloadanyvideo.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name downloadanyvideo.com www.downloadanyvideo.com;

    ssl_certificate /etc/letsencrypt/live/downloadanyvideo.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/downloadanyvideo.com/privkey.pem;

    # API routes
    location /api/ {
        proxy_pass http://api_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/downloadanyvideo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 8. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d downloadanyvideo.com -d www.downloadanyvideo.com
```

### 9. Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 10. Monitoring

```bash
pm2 log
pm2 monit
```

## MongoDB Setup

### Local MongoDB

```bash
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### MongoDB Atlas (Cloud)

1. Create cluster at mongodb.com/cloud
2. Create a database user and allow your server IP address
3. Add the remote connection string to `.env`

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.example.mongodb.net/downloadanyvideo?retryWrites=true&w=majority
MONGODB_DB_NAME=downloadanyvideo
MONGODB_MAX_POOL_SIZE=10
```

## 🔄 CI/CD (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm install
      - run: npm run build --workspaces
      - uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/downloadanyvideo
            git pull
            npm install
            npm run build --workspaces
            pm2 restart downloadanyvideo-api downloadanyvideo-web
```

## 🔧 Maintenance

### Backup Database

```bash
mongodump --out /backups/mongo-backup-$(date +%Y%m%d)
```

### Check Logs

```bash
pm2 logs downloadanyvideo-api
pm2 logs downloadanyvideo-web
```

### Update Application

```bash
cd /var/www/downloadanyvideo
git pull
npm install
npm run build --workspaces
pm2 restart all
```

## ✅ Verification

- Frontend: `https://downloadanyvideo.com`
- API: `https://downloadanyvideo.com/api/health`
- Monitor: `pm2 monit`

---

**For advanced deployments, consider AWS, DigitalOcean App Platform, or Heroku.**
