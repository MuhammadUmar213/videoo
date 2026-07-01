import { useEffect, useState } from "react";
import { AdBanner, AdResponsive } from "../components/AdPlaceholder";
import { fetchVideoInfo } from "../services/api";

export default function Downloader() {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUrl(params.get("url") || "");
  }, []);

  const handleFetch = async (event) => {
    event.preventDefault();
    setError("");
    setVideo(null);

    if (!url.trim()) {
      setError("Please paste a video URL first.");
      return;
    }

    try {
      setLoading(true);
      const data = await fetchVideoInfo(url.trim());
      setVideo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <AdBanner />
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-500 mb-2">Fast downloader</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
          Video Downloader
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Paste a public video link, fetch the available formats, and choose the
          quality you need.
        </p>
      </div>

      <form onSubmit={handleFetch} className="card mb-8">
        <input
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Paste video URL here..."
          className="input-primary mb-4 w-full"
        />
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Fetching..." : "Fetch Video Info"}
        </button>
        {error && <p className="mt-4 text-sm font-semibold text-pink-500">{error}</p>}
      </form>

      <div className="mb-8">
        <AdResponsive />
      </div>

      {video ? (
        <div className="card">
          <div className="grid md:grid-cols-[220px_1fr] gap-6">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full rounded-lg bg-gray-100 aspect-video object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                {video.platform}
              </p>
              <h2 className="text-2xl font-bold mt-2 mb-4">{video.title}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {video.formats.map((item) => (
                  <button
                    key={`${item.quality}-${item.format}`}
                    className="btn-secondary text-left flex items-center justify-between"
                  >
                    <span>{item.quality}</span>
                    <span className="uppercase text-xs text-gray-500">
                      {item.format}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 py-12 bg-gray-50 rounded-lg border border-gray-100">
          <p className="font-semibold">Paste a video URL above to get started</p>
        </div>
      )}
    </div>
  );
}
