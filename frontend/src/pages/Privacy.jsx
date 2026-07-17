import SEO from "../components/SEO";
import { site } from "../data/site";

export default function Privacy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SEO
        title="Privacy Policy | VidSavio"
        description="VidSavio privacy policy covering logs, analytics, cookies, and rights holder contact details."
        path="/privacy-policy"
      />
      <h1 className="mb-4 text-4xl font-bold text-slate-950">Privacy Policy</h1>
      <p className="mb-8 text-slate-600">Last updated: July 17, 2026</p>

      <div className="space-y-6 text-slate-700">
        <section className="card">
          <h2 className="mb-4 text-2xl font-bold">1. Overview</h2>
          <p>
            {site.name} operates a video format checking and downloader flow for
            permitted offline viewing. This policy explains what information we
            collect and how we use it.
          </p>
        </section>

        <section className="card">
          <h2 className="mb-4 text-2xl font-bold">2. Information We Collect</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Browser and device data for security and diagnostics</li>
            <li>Hashed or limited request data for rate limiting and abuse prevention</li>
            <li>Contact form details when you choose to send a message</li>
            <li>Aggregate analytics if analytics tools are enabled</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="mb-4 text-2xl font-bold">3. How We Use Data</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Operate and improve the service</li>
            <li>Prevent abuse, spam, and excessive automated requests</li>
            <li>Respond to support and DMCA inquiries</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="mb-4 text-2xl font-bold">4. Cookies and Ads</h2>
          <p>
            Essential cookies may support site functionality. Analytics and ad
            cookies may be used if those services are enabled. See the{" "}
            <a className="text-fuchsia-600" href="/cookie-policy">
              Cookie Policy
            </a>{" "}
            for more detail.
          </p>
        </section>

        <section className="card">
          <h2 className="mb-4 text-2xl font-bold">5. Contact</h2>
          <p>
            Privacy questions can be sent to{" "}
            <a className="text-fuchsia-600" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>
            . Copyright notices should be sent to{" "}
            <a className="text-fuchsia-600" href={`mailto:${site.dmcaEmail}`}>
              {site.dmcaEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
