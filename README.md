# DownloadAnyVideo - Full Stack Video Downloader

🚀 An original, AdSense-friendly video downloader web application with modern UI and premium features.

## 📋 Project Structure

```
downloadanyvideo/
├── frontend/          # React + Tailwind CSS app
├── backend/           # Node.js + Express API
├── shared/            # Shared utilities & types
├── docker-compose.yml # Docker setup for local dev
└── .env.example       # Environment template
```

## 🎯 Tech Stack

- **Frontend:** React 18, Tailwind CSS, Vite, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **DevOps:** Docker, Docker Compose
- **Core Engine:** yt-dlp (Python subprocess)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm workspaces support
- Docker & Docker Compose (for local dev)

### Installation

```bash
# Install all workspaces
npm install

# Start development server (both frontend + backend)
npm run dev

# Build for production
npm run build
```

### Frontend (Port 3000)
```bash
cd frontend
npm run dev
```

### Backend (Port 5000)
```bash
cd backend
npm run dev
```

## 📦 Docker Setup

```bash
docker-compose up -d
```

This starts:
- Frontend on `http://localhost:3000`
- Backend API on `http://localhost:5000`
- MongoDB on `localhost:27017`

## 🎨 Design Guidelines

- **Primary Colors:** Electric Blue (#00B4FF), Vivid Purple (#7B2FFF), Hot Pink (#FF2D78)
- **Background:** White (#FFFFFF), Light Gray (#F5F7FA)
- **Typography:** Inter / Poppins
- **Styling:** Tailwind CSS, micro-animations, Lottie
- **Responsive:** Mobile-first design

## 📄 Legal Compliance

- Privacy Policy
- Terms of Service
- DMCA Takedown Form
- Robots.txt & Sitemap.xml
- Google Analytics 4
- AdSense integration ready

## 🔒 Security

- Rate limiting (express-rate-limit)
- CORS protection
- Security headers (Helmet.js)
- Input validation & sanitization
- No personal data storage

## 📊 Features

✅ Multi-platform support (YouTube, Instagram, Facebook, Twitter, TikTok, etc.)
✅ Multiple format downloads (MP4, MP3, WEBM)
✅ Quality selector (4K to 144p)
✅ Bulk URL input
✅ Download history (localStorage)
✅ PWA support (installable)
✅ Real-time file size estimation
✅ Browser notifications
✅ Multi-language support (EN, UR, AR, ES)

## 📝 License

MIT - See LICENSE.md for details

---

**Ready to deploy?** See deployment guides in `/docs` folder.
