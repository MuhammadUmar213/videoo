import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { fetchVideoInfo } from "../services/api";

export default function Downloader() {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

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

    if (!agreed) {
      setError(
        "Please confirm you own the content or have permission to download it.",
      );
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
    <div className="bg-white">
      <SEO
        title="Video Format Checker | VidSavio"
        description="Paste a public video URL and check available formats after confirming you have permission to download the content."
        path="/download"
      />

      <section className="hero-gradient px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-violet-200">
            Format checker
          </p>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            Video Downloader
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-violet-100">
            Paste a public video link, confirm you have the right to save it,
            and choose from the available formats.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <form onSubmit={handleFetch} className="card mb-8">
          <input
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Paste video URL here..."
            className="input-primary mb-4 w-full"
          />
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch Video Info"}
          </button>
          <label className="mt-4 flex gap-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500"
            />
            <span>
              I confirm I own this content or have permission from the copyright
              holder to download it.
            </span>
          </label>
          {error && (
            <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>
          )}
        </form>

        {video ? (
          <div className="card">
            <div className="grid gap-6 md:grid-cols-[220px_1fr]">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="aspect-video w-full rounded-lg bg-slate-100 object-cover"
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {video.platform}
                </p>
                <h2 className="mb-4 mt-2 text-2xl font-bold">{video.title}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {video.formats.map((item) => (
                    <button
                      key={`${item.quality}-${item.format}`}
                      className="btn-secondary flex items-center justify-between text-left"
                    >
                      <span>{item.quality}</span>
                      <span className="text-xs uppercase text-slate-500">
                        {item.format}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-slate-50 py-12 text-center text-slate-600">
            <p className="font-semibold">
              Paste a video URL above to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
