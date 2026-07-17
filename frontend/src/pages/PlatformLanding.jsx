import { useState } from "react";
import SEO from "../components/SEO";

export default function PlatformLanding({ platform }) {
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Can I download ${platform.name} videos with VidSavio?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: platform.compliance,
        },
      },
      {
        "@type": "Question",
        name: "Do I need to log in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No login is required for the basic free downloader flow.",
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      <SEO
        title={platform.title}
        description={platform.description}
        path={platform.path}
        schema={schema}
      />

      <section className="hero-gradient border-b border-violet-200 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-violet-200">
            {platform.name} downloader
          </p>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            {platform.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-violet-100">
            {platform.intro}
          </p>

          <form onSubmit={handleSubmit} className="download-panel mx-auto mt-8">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-lg border border-slate-200 bg-white/95 backdrop-blur p-2 shadow-lg sm:flex-row">
                <input
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder={`Paste public ${platform.name} URL`}
                  className="min-h-[52px] flex-1 rounded-md border-0 px-4 text-base font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0"
                />
                <div className="flex gap-2">
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
              <button type="submit" className="download-btn" disabled={!agreed}>
                Download
              </button>
            </div>
            <label className="mt-4 flex gap-3 text-left text-sm font-medium text-slate-700">
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

          <div className="mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Permission-first",
              "Source quality",
              "No login",
              "Public links",
            ].map((item) => (
              <div key={item} className="trust-chip">
                <span className="trust-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {[
            ["One clear action", "No misleading duplicate download buttons."],
            [
              "Format choices",
              "MP4, audio, and quality options are presented clearly.",
            ],
            ["Privacy first", "No account required for the free basic flow."],
          ].map(([title, text]) => (
            <div key={title} className="feature-card">
              <div className="feature-icon">{title.slice(0, 2)}</div>
              <h2 className="mt-4 text-xl font-black text-slate-950">
                {title}
              </h2>
              <p className="mt-2 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-black text-slate-950">
            Responsible use for {platform.name}
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">{platform.compliance}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <a
              className="btn-secondary text-center"
              href="/terms-and-conditions"
            >
              Review Terms
            </a>
            <a
              className="btn-secondary text-center"
              href="/dmca-copyright-policy"
            >
              DMCA Policy
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
