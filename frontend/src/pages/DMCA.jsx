import SEO from "../components/SEO";
import { site } from "../data/site";

export default function DMCA() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SEO
        title="DMCA Copyright Policy | VidSavio"
        description="Rights holders can contact VidSavio for copyright and DMCA takedown requests."
        path="/dmca-copyright-policy"
      />
      <h1 className="mb-8 text-4xl font-bold text-slate-950">
        DMCA Copyright Policy
      </h1>

      <div className="space-y-6 text-slate-700">
        <section className="card">
          <p className="text-lg font-bold">
            {site.name} respects copyright law and the Digital Millennium
            Copyright Act.
          </p>
        </section>

        <section className="card">
          <h2 className="mb-4 text-2xl font-bold">Reporting Copyright Issues</h2>
          <p>
            If you believe your copyrighted work has been infringed through use
            of this service, submit a notice to{" "}
            <a className="text-fuchsia-600" href={`mailto:${site.dmcaEmail}`}>
              {site.dmcaEmail}
            </a>
            .
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li>Your name and contact information</li>
            <li>Description of the copyrighted work</li>
            <li>The URL or identifying information for the disputed content</li>
            <li>A good-faith statement that the use is unauthorized</li>
            <li>Your physical or electronic signature</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="mb-4 text-2xl font-bold">Our Response</h2>
          <p>
            We review complete notices and take appropriate action, including
            restricting access where warranted.
          </p>
        </section>
      </div>

      <div className="card mt-12">
        <h3 className="mb-4 text-xl font-bold">Submit DMCA Takedown Notice</h3>
        <form className="space-y-4">
          <input type="email" placeholder="Your email" className="input-primary w-full" />
          <textarea
            placeholder="Describe the copyrighted work..."
            className="input-primary w-full"
            rows="4"
          />
          <input
            type="url"
            placeholder="URL or identifying information"
            className="input-primary w-full"
          />
          <button type="submit" className="btn-primary">
            Submit Notice
          </button>
        </form>
      </div>
    </div>
  );
}
