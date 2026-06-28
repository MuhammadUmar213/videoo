# DownloadAnyVideo - Full Stack Project

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud)
- Docker (optional)

### Local Development (without Docker)

#### Backend

```bash
cd backend
npm install
# Create .env file (copy from .env.example)
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
# Create .env file (copy from .env.example)
npm run dev
```

### Using Docker Compose

```bash
docker-compose up -d
```

This starts:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- MongoDB: `localhost:27017`

## 📂 Project Structure

```
.
├── frontend/           # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/            # Node.js API
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   └── package.json
├── shared/             # Shared utilities (optional)
├── docker-compose.yml
└── package.json        # Monorepo config
```

## 🔧 Configuration

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_ANALYTICS_ID=G_YOUR_ID
```

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/downloadanyvideo
FRONTEND_URL=http://localhost:3000
```

## 🎨 Design System

- **Primary Blue:** #00B4FF
- **Purple:** #7B2FFF
- **Pink Accent:** #FF2D78
- **Background:** #FFFFFF
- **Light Gray:** #F5F7FA
- **Typography:** Inter / Poppins

## 📝 API Endpoints

```
POST   /api/fetch-info       - Get video metadata
POST   /api/download         - Download video
GET    /api/supported-sites  - List platforms
GET    /api/health           - Health check
```

## 🔒 Security Features

- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ Rate limiting (10 req/min)
- ✅ No personal data storage
- ✅ Input validation
- ✅ HTTPS ready
- ✅ IP hashing for privacy

## 📊 Analytics & Compliance

- ✅ Google Analytics 4
- ✅ Privacy Policy
- ✅ Terms of Service
- ✅ DMCA Takedown page
- ✅ Robots.txt
- ✅ Sitemap.xml
- ✅ AdSense integration ready

## 🎯 Next Steps

1. **Install Dependencies**

   ```bash
   npm install  # Installs all workspaces
   ```

2. **Start Development**

   ```bash
   npm run dev  # Start frontend + backend
   ```

3. **Integrate yt-dlp** (replace mock API)
   - Install Python + yt-dlp
   - Create wrapper in `/backend/utils/ytdlp.js`
   - Update `/backend/src/routes/download.js`

4. **Add Features**
   - Bulk downloads
   - Download history UI
   - Favorites system
   - Multi-language support
   - PWA installation
   - Browser notifications

5. **Deploy**
   - Frontend: Vercel / Netlify / VPS
   - Backend: Railway / Render / VPS
   - Database: MongoDB Atlas

## 📚 Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- See `.env.example` files for configuration

## 💡 Key Features

✨ **UI/UX First**

- Bright, modern design
- Mobile-responsive
- Fast loading
- Smooth animations

🎯 **Functionality**

- 50+ platform support
- Multi-format downloads
- Quality selection
- Bulk operations
- History & favorites

🔐 **Production Ready**

- Rate limiting
- Error handling
- CORS enabled
- Security headers
- Analytics
- Legal compliance

## 📞 Support

For issues and questions, check the individual README files in `frontend/` and `backend/` folders.

---

**Built with ❤️ using React, Node.js, and Tailwind CSS**
