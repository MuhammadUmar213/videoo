import SEO from "../components/SEO";
import { site } from "../data/site";

export default function About() {
  return (
    <div className="bg-white">
      <SEO
        title="About VidSavio"
        description="Learn about VidSavio, a responsible video downloader for permitted offline viewing."
        path="/about"
      />

      <section className="hero-gradient px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-black text-white sm:text-5xl">
            About {site.name}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-violet-100">
            A clean, responsible approach to checking video formats for permitted offline viewing.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16">
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
    </div>
  );
}
