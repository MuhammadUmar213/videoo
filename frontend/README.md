# DownloadAnyVideo Frontend

React + Tailwind CSS web app for video downloading.

## Setup

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env`:

```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_ANALYTICS_ID=G_YOUR_ID
```

## Development

```bash
npm run dev
```

App runs on `http://localhost:3000`

## Production Build

```bash
npm run build
```

## Features

- ✅ Bright, vibrant UI (Blue #00B4FF, Purple #7B2FFF, Pink #FF2D78)
- ✅ Responsive design (mobile-first)
- ✅ Tailwind CSS styling
- ✅ Zustand state management
- ✅ React Router navigation
- ✅ API integration via Axios
- ✅ Progressive Web App (PWA) ready
- ⬜ Lottie animations
- ⬜ Dark mode toggle
- ⬜ Multi-language support

## Pages

- Home - Hero, features, FAQ preview
- Downloader - URL input, video preview, download options
- Tools - Individual tool pages
- Blog - Articles for SEO
- FAQ - Accordion of common questions
- About - Company info
- Privacy, Terms, DMCA - Legal pages

## Tech Stack

- React 18
- Vite (build tool)
- Tailwind CSS
- React Router
- Zustand (state)
- Axios (HTTP)

## File Structure

```
src/
├── components/     - Reusable components
├── pages/         - Page components
├── services/      - API calls
├── store.js       - Global state
└── index.css      - Global styles
```

## Deployment

```bash
npm run build
# Deploy 'dist' folder to Vercel, Netlify, or VPS
```
