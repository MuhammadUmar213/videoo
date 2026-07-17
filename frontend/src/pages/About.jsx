import SEO from "../components/SEO";
import { site } from "../data/site";

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SEO
        title="About VidSavio"
        description="Learn about VidSavio, a responsible video downloader for permitted offline viewing."
        path="/about"
      />
      <h1 className="mb-6 text-4xl font-bold text-slate-950">
        About {site.name}
      </h1>
      <div className="space-y-6 text-slate-700">
        <section className="card">
          <h2 className="mb-3 text-2xl font-bold">Our Focus</h2>
          <p>
            {site.name} is built around a clean, mobile-friendly way to review
            video formats for offline viewing when users own the content, have
            permission, or the content is lawfully available to save.
          </p>
        </section>
        <section className="card">
          <h2 className="mb-3 text-2xl font-bold">What We Avoid</h2>
          <p>
            We avoid misleading download buttons, forced redirects, pop-under
            flows, and promotional claims that encourage copyright misuse.
          </p>
        </section>
      </div>
    </div>
  );
}
