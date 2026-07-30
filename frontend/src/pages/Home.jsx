import { Link } from "react-router";
import SEO from "../components/SEO";
import DownloadForm from "../components/DownloadForm";
import { AdBanner, AdResponsive } from "../components/AdPlaceholder";
import { blogPosts, platforms, site } from "../data/site";

const trustItems = [
  "No login required",
  "No watermark added",
  "Public links only",
  "Clear format options",
];

const heroBadges = [
  "No login required",
  "Permission-first workflow",
  "Transparent legal pages",
];

const features = [
  ["Fast", "Fast loading pages and a streamlined single-action flow"],
  ["Clean", "No misleading duplicate buttons or forced redirects"],
  ["Private", "No account required for the basic downloader flow"],
  ["Ready", "MP4, audio, and quality choices for permitted offline viewing"],
];

const steps = [
  ["01", "Copy the URL", "Copy a public video link from the platform."],
  ["02", "Paste the link", "Paste it into VidSavio and confirm your rights."],
  ["03", "Choose quality", "Select the available format that fits your device."],
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: site.name,
  url: site.domain,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  description:
    "Save videos you own, have permission to download, or that are Creative Commons or public domain.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function Home() {
  return (
    <div className="overflow-hidden bg-white">
      <SEO
        title="VidSavio - Video Downloader for Permitted Offline Viewing"
        description="Save videos you own, have permission to download, or that are Creative Commons or public domain from YouTube, Instagram, TikTok, and Facebook."
        path="/"
        schema={schema}
      />

      <div className="border-b border-violet-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 px-4 py-3">
        <div className="mx-auto max-w-6xl">
          <AdBanner />
        </div>
      </div>

      <section className="hero-gradient relative px-4 py-9 sm:px-6 sm:py-14 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <nav
            aria-label="Platform downloaders"
            className="mx-auto mb-5 flex w-full max-w-full gap-2 overflow-x-auto rounded-full border border-white/30 bg-white/10 p-1 shadow-lg backdrop-blur-md sm:w-fit sm:flex-wrap sm:justify-center sm:overflow-visible"
          >
            {platforms.map((platform) => (
              <Link
                key={platform.path}
                to={platform.path}
                className="shrink-0 rounded-full px-3 py-2 text-xs font-bold text-white transition hover:bg-white/20 sm:px-4 sm:text-sm"
              >
                {platform.name}
              </Link>
            ))}
          </nav>

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

          <ul className="mx-auto mt-5 flex max-w-2xl list-none flex-wrap justify-center gap-2 text-xs font-semibold text-white sm:mt-6 sm:gap-3 sm:text-sm">
            {heroBadges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-white/30 bg-white/10 px-3 py-2 backdrop-blur"
              >
                {badge}
              </li>
            ))}
          </ul>

          <DownloadForm className="mt-7 sm:mt-8" />

          <ul className="mx-auto mt-6 grid max-w-4xl list-none grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => (
              <li key={item} className="trust-chip">
                <span className="trust-dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="features-heading"
        className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2
              id="features-heading"
              className="text-2xl font-black text-slate-950 sm:text-3xl"
            >
              Key Features
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Built for the fast, no-confusion downloader experience users
              expect.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(([title, text]) => (
              <div key={title} className="feature-card">
                <div className="feature-icon" aria-hidden="true">
                  {title.slice(0, 2)}
                </div>
                <h3 className="mt-4 text-xl font-black text-slate-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="how-it-works-heading"
        className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2
              id="how-it-works-heading"
              className="text-2xl font-black text-slate-950 sm:text-3xl"
            >
              How It Works
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Three simple steps, with permission checked before the format
              request.
            </p>
          </div>
          <ol className="grid list-none gap-5 md:grid-cols-3">
            {steps.map(([step, title, text]) => (
              <li key={step} className="step-card">
                <span aria-hidden="true">{step}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <AdResponsive />
        </div>
      </section>

      <section
        aria-labelledby="guides-heading"
        className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="guides-heading"
                className="text-2xl font-black text-slate-950 sm:text-3xl"
              >
                Responsible Downloading Guides
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                SEO-friendly articles focused on lawful offline viewing.
              </p>
            </div>
            <Link
              to="/blog"
              className="font-bold text-violet-700 hover:text-fuchsia-600"
            >
              View Blog
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="card">
                <p className="text-sm font-semibold text-violet-700">
                  <time dateTime={post.date}>{post.date}</time>
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="hover:text-fuchsia-600"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  {post.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
