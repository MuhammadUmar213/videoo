import { useState } from "react";
import SEO from "../components/SEO";
import { AdBanner, AdResponsive } from "../components/AdPlaceholder";
import { blogPosts, platforms, site } from "../data/site";

const trustItems = [
  "No login required",
  "No watermark added",
  "Public links only",
  "Clear format options",
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [agreed, setAgreed] = useState(false);

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      setUrl((current) => current);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!agreed) return;
    const query = url ? `?url=${encodeURIComponent(url)}` : "";
    window.location.href = `/download${query}`;
  };

  return (
    <div className="overflow-hidden bg-white">
      <SEO
        title="VidSavio - Video Downloader for Permitted Offline Viewing"
        description="Save videos you own, have permission to download, or that are Creative Commons or public domain from YouTube, Instagram, TikTok, and Facebook."
        path="/"
      />

      <div className="border-b border-violet-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 px-4 py-3">
        <div className="mx-auto max-w-6xl">
          <AdBanner />
        </div>
      </div>

      <section className="hero-gradient relative px-4 py-9 sm:px-6 sm:py-14 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-5 flex w-full max-w-full gap-2 overflow-x-auto rounded-full border border-white/30 bg-white/10 p-1 shadow-lg backdrop-blur-md sm:w-fit sm:flex-wrap sm:justify-center sm:overflow-visible">
            {platforms.slice(0, 5).map((platform) => (
              <a
                key={platform.path}
                href={platform.path}
                className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-white transition hover:bg-white/20 sm:px-4 sm:text-sm"
              >
                {platform.name}
              </a>
            ))}
          </div>

          <p className="text-xs font-bold uppercase tracking-wide text-violet-200 sm:text-sm">
            Fast, clean, permission-first downloader
          </p>
          <h1 className="mx-auto mt-3 max-w-4xl text-3xl font-black leading-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
            Download videos you are allowed to save
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-violet-100 sm:mt-5 sm:text-lg sm:leading-8">
            {site.name} gives you a simple paste-and-download flow for public
            videos you own, have permission to save, or that are lawfully
            available for offline viewing.
          </p>
          <div className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-2 text-xs font-semibold text-white sm:mt-6 sm:gap-3 sm:text-sm">
            <span className="rounded-full border border-white/30 bg-white/10 backdrop-blur px-3 py-2">
              No login required
            </span>
            <span className="rounded-full border border-white/30 bg-white/10 backdrop-blur px-3 py-2">
              Permission-first workflow
            </span>
            <span className="rounded-full border border-white/30 bg-white/10 backdrop-blur px-3 py-2">
              Transparent legal pages
            </span>
          </div>

          <form onSubmit={handleSubmit} className="download-panel mx-auto mt-7 sm:mt-8">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-lg border border-white/30 bg-white/95 p-2 shadow-lg backdrop-blur sm:flex-row">
                <input
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="Paste video URL here"
                  className="min-h-[52px] w-full min-w-0 flex-1 rounded-md border-0 px-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0 sm:px-4 sm:text-base"
                />
                <div className="grid grid-cols-2 gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={pasteFromClipboard}
                    className="utility-btn"
                  >
                    Paste
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrl("")}
                    className="utility-btn"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="download-btn w-full lg:w-auto"
                disabled={!agreed}
              >
                Download
              </button>
            </div>

            <label className="mt-4 flex gap-3 rounded-lg bg-white/95 p-3 text-left text-xs font-medium leading-6 text-slate-700 shadow-md sm:bg-transparent sm:p-0 sm:text-sm sm:shadow-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500"
              />
              <span>
                I confirm I own this content or have permission from the
                copyright holder to download it.
              </span>
            </label>
          </form>

          <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item} className="trust-chip">
                <span className="trust-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">Key Features</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Built for the fast, no-confusion downloader experience users
              expect.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Fast",
                "Fast loading pages and a streamlined single-action flow",
              ],
              ["Clean", "No misleading duplicate buttons or forced redirects"],
              ["Private", "No account required for the basic downloader flow"],
              [
                "Ready",
                "MP4, audio, and quality choices for permitted offline viewing",
              ],
            ].map(([title, text]) => (
              <div key={title} className="feature-card">
                <div className="feature-icon">{title.slice(0, 2)}</div>
                <h3 className="mt-4 text-xl font-black text-slate-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">How It Works</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Three simple steps, with permission checked before the format
              request.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                "01",
                "Copy the URL",
                "Copy a public video link from the platform.",
              ],
              [
                "02",
                "Paste the link",
                "Paste it into VidSavio and confirm your rights.",
              ],
              [
                "03",
                "Choose quality",
                "Select the available format that fits your device.",
              ],
            ].map(([step, title, text]) => (
              <div key={step} className="step-card">
                <span>{step}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <AdResponsive />
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
                Responsible Downloading Guides
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                SEO-friendly articles focused on lawful offline viewing.
              </p>
            </div>
            <a href="/blog" className="font-bold text-violet-700">
              View Blog
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {blogPosts.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="card">
                <p className="text-sm font-semibold text-violet-700">
                  {post.date}
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  {post.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
