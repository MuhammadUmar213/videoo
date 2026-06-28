import { AdBanner, AdResponsive } from "../components/AdPlaceholder";

export default function Downloader() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Ad Zone 1: Top Banner */}
      <div className="mb-8">
        <AdBanner />
      </div>

      <h1 className="text-4xl font-bold mb-8 gradient-text">
        Video Downloader
      </h1>

      <div className="card mb-8">
        <input
          type="url"
          placeholder="Paste video URL here..."
          className="input-primary mb-4 w-full"
        />
        <button className="btn-primary w-full">Fetch Video Info</button>
      </div>

      {/* Ad Zone 2: Middle Banner */}
      <div className="mb-8">
        <AdResponsive />
      </div>

      <div className="text-center text-gray-600 py-12">
        <p>Paste a video URL above to get started</p>
      </div>
    </div>
  );
}
