import { Link } from "react-router";
import SEO from "../components/SEO";
import { platforms, site } from "../data/site";

// Every entry maps to a route that actually exists. The previous list
// advertised a Twitter/X page and an MP3 extractor that were never built, and
// its "Try Now" buttons did nothing at all.
const tools = [
  ...platforms.map((platform) => ({
    name: `${platform.name} Downloader`,
    desc: platform.description,
    to: platform.path,
    cta: "Open tool",
  })),
  {
    name: "Any supported link",
    desc: "Paste a link from any supported platform and review the formats available for it.",
    to: "/download",
    cta: "Open format checker",
  },
];

export default function Tools() {
  return (
    <div className="bg-white">
      <SEO
        title={`Downloader Tools | ${site.name}`}
        description="Every VidSavio downloader page in one place, covering YouTube, Instagram, TikTok, and Facebook, plus the general format checker."
        path="/tools"
      />

      <section className="hero-gradient px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-black text-white sm:text-5xl">
            Downloader Tools
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-violet-100 sm:text-lg">
            Pick the platform you are saving from, or use the general format
            checker for any supported link.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <div key={tool.name} className="card flex flex-col">
              <h2 className="mb-2 text-xl font-bold text-slate-950">
                {tool.name}
              </h2>
              <p className="mb-6 flex-1 text-slate-600">{tool.desc}</p>
              <Link to={tool.to} className="btn-primary self-start">
                {tool.cta}
                <span className="sr-only"> — {tool.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
