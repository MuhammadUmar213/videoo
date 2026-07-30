import { useEffect, useId, useState } from "react";
import { useSearchParams } from "react-router";
import SEO from "../components/SEO";
import { buildDownloadUrl, fetchVideoInfo } from "../services/api";

export default function Downloader() {
  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [selectionStatus, setSelectionStatus] = useState("");
  const inputId = useId();
  const consentId = useId();

  // Read through the router rather than window.location so an in-app
  // navigation to /download?url=... updates the field.
  useEffect(() => {
    setUrl(searchParams.get("url") || "");
  }, [searchParams]);

  const handleFetch = async (event) => {
    event.preventDefault();
    setError("");
    setVideo(null);
    setSelectionStatus("");

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

  const handleSelectFormat = (item) => {
    setError("");
    setSelectionStatus(
      `Starting ${item.quality} ${item.format.toUpperCase()} download. Large files can take a moment to begin.`,
    );

    // Hand the transfer to the browser so it gets a real progress indicator
    // and can resume, rather than buffering the whole file in the page.
    window.location.assign(
      buildDownloadUrl({
        url: url.trim(),
        formatId: item.formatId,
        ext: item.format,
        quality: item.quality,
        title: video?.title,
      }),
    );
  };

  const formatSize = (bytes) => {
    if (!bytes) return null;
    const mb = bytes / (1024 * 1024);
    return mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${Math.round(mb)} MB`;
  };

  const formatDuration = (seconds) => {
    const total = Math.round(seconds);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
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
          <p className="text-xs font-bold uppercase tracking-wide text-violet-200 sm:text-sm">
            Format checker
          </p>
          <h1 className="mt-3 text-3xl font-black text-white sm:mt-4 sm:text-5xl">
            Video Downloader
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-violet-100 sm:text-lg">
            Paste a public video link, confirm you have the right to save it,
            and choose from the available formats.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <form onSubmit={handleFetch} className="card mb-8" noValidate>
          <label htmlFor={inputId} className="mb-2 block font-bold">
            Video URL
          </label>
          <input
            id={inputId}
            type="url"
            inputMode="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              if (error) setError("");
            }}
            placeholder="Paste video URL here..."
            aria-invalid={error ? "true" : undefined}
            className="input-primary mb-4 w-full"
          />

          <label
            htmlFor={consentId}
            className="mb-4 flex gap-3 text-sm font-medium text-slate-700"
          >
            <input
              id={consentId}
              type="checkbox"
              checked={agreed}
              onChange={(event) => {
                setAgreed(event.target.checked);
                if (error) setError("");
              }}
              className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500"
            />
            <span>
              I confirm I own this content or have permission from the copyright
              holder to download it.
            </span>
          </label>

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Fetching…" : "Fetch Video Info"}
          </button>

          <div aria-live="polite">
            {error && (
              <p role="alert" className="mt-4 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}
            {selectionStatus && (
              <p className="mt-4 rounded-md bg-green-50 p-3 text-sm font-semibold text-green-800">
                {selectionStatus}
              </p>
            )}
          </div>
        </form>

        {loading && (
          <div className="card" aria-hidden="true">
            <div className="grid gap-6 md:grid-cols-[220px_1fr]">
              <div className="aspect-video w-full animate-pulse rounded-lg bg-slate-200 motion-reduce:animate-none" />
              <div className="space-y-3">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200 motion-reduce:animate-none" />
                <div className="h-7 w-3/4 animate-pulse rounded bg-slate-200 motion-reduce:animate-none" />
                <div className="grid gap-3 pt-3 sm:grid-cols-2">
                  <div className="h-12 animate-pulse rounded bg-slate-200 motion-reduce:animate-none" />
                  <div className="h-12 animate-pulse rounded bg-slate-200 motion-reduce:animate-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && video && (
          <div className="card">
            <div className="grid gap-6 md:grid-cols-[220px_1fr]">
              <img
                src={video.thumbnail}
                alt=""
                width="320"
                height="180"
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
                className="aspect-video w-full rounded-lg bg-slate-100 object-cover"
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {video.platform}
                  {video.uploader ? ` · ${video.uploader}` : ""}
                  {video.duration ? ` · ${formatDuration(video.duration)}` : ""}
                </p>
                <h2 className="mb-4 mt-2 text-2xl font-bold text-slate-950">
                  {video.title}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {video.formats?.map((item) => (
                    <button
                      key={item.formatId}
                      type="button"
                      onClick={() => handleSelectFormat(item)}
                      className="btn-secondary flex items-center justify-between gap-3 text-left"
                    >
                      <span className="font-bold">{item.quality}</span>
                      <span className="text-xs uppercase text-slate-500">
                        {formatSize(item.filesize)
                          ? `${item.format} · ${formatSize(item.filesize)}`
                          : item.format}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  Downloads run through this server. Only save content you own
                  or have permission to download.
                </p>
              </div>
            </div>
          </div>
        )}

        {!loading && !video && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 py-12 text-center text-slate-600">
            <p className="font-semibold">
              Paste a video URL above to get started
            </p>
            <p className="mt-2 text-sm">
              Supported platforms include YouTube, Instagram, TikTok, and
              Facebook.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
