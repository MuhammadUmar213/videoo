import SEO from "../components/SEO";

export default function Disclaimer() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SEO
        title="Disclaimer | VidSavio"
        description="VidSavio provides a tool for permitted offline saving only. Users are responsible for respecting copyright and platform rules."
        path="/disclaimer"
      />
      <h1 className="mb-8 text-4xl font-bold text-slate-950">Disclaimer</h1>
      <div className="space-y-6 text-slate-700">
        <section className="card">
          <h2 className="mb-3 text-2xl font-bold">User Responsibility</h2>
          <p>
            VidSavio is intended for content you own, content you have
            permission to download, or content that is lawfully available for
            offline saving. Users are responsible for complying with copyright
            law and source platform terms.
          </p>
        </section>
        <section className="card">
          <h2 className="mb-3 text-2xl font-bold">No Affiliation</h2>
          <p>
            VidSavio is not affiliated with YouTube, Instagram, TikTok,
            Facebook, Meta, Google, or ByteDance.
          </p>
        </section>
      </div>
    </div>
  );
}
