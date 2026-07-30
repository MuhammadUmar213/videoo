import { Link } from "react-router";
import SEO from "../components/SEO";
import DownloadForm from "../components/DownloadForm";
import { site } from "../data/site";

const highlights = [
  ["One clear action", "No misleading duplicate download buttons."],
  ["Format choices", "MP4, audio, and quality options are presented clearly."],
  ["Privacy first", "No account required for the free basic flow."],
];

const trustItems = [
  "Permission-first",
  "Source quality",
  "No login",
  "Public links",
];

export default function PlatformLanding({ platform }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Can I download ${platform.name} videos with ${site.name}?`,
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

      <section className="hero-gradient border-b border-violet-200 px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-violet-200 sm:text-sm">
            {platform.name} downloader
          </p>
          <h1 className="mt-3 text-3xl font-black text-white sm:mt-4 sm:text-5xl">
            {platform.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-violet-100 sm:mt-5 sm:text-lg sm:leading-8">
            {platform.intro}
          </p>

          <DownloadForm
            className="mt-7 sm:mt-8"
            placeholder={`Paste public ${platform.name} URL`}
          />

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

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <h2 className="sr-only">Why use {site.name}</h2>
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {highlights.map(([title, text]) => (
            <div key={title} className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                {title.slice(0, 2)}
              </div>
              <h3 className="mt-4 text-xl font-black text-slate-950">{title}</h3>
              <p className="mt-2 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="responsible-use-heading"
        className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <h2
            id="responsible-use-heading"
            className="text-2xl font-black text-slate-950 sm:text-3xl"
          >
            Responsible use for {platform.name}
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">{platform.compliance}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link className="btn-secondary text-center" to="/terms-and-conditions">
              Review Terms
            </Link>
            <Link className="btn-secondary text-center" to="/dmca-copyright-policy">
              DMCA Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
