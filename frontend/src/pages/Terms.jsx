import SEO from "../components/SEO";
import { site } from "../data/site";

export default function Terms() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SEO
        title="Terms and Conditions | VidSavio"
        description="VidSavio terms require users to download only content they own, have permission to save, or that is lawfully available for offline use."
        path="/terms-and-conditions"
      />
      <h1 className="mb-8 text-4xl font-bold text-slate-950">
        Terms and Conditions
      </h1>

      <div className="space-y-6 text-slate-700">
        <section className="card">
          <h2 className="mb-4 text-2xl font-bold">1. Acceptance of Terms</h2>
          <p>By using {site.name}, you agree to these terms.</p>
        </section>

        <section className="card">
          <h2 className="mb-4 text-2xl font-bold">2. Permitted Use</h2>
          <p>Users may only download videos:</p>
          <ul className="mt-2 list-inside list-disc space-y-2">
            <li>That they own or have permission to download</li>
            <li>That are Creative Commons, public domain, or lawfully available</li>
            <li>In compliance with local laws and source platform rules</li>
            <li>Without violating copyright or intellectual property rights</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="mb-4 text-2xl font-bold">3. Prohibited Activities</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Downloading copyrighted content without permission</li>
            <li>Bypassing source platform restrictions or private access controls</li>
            <li>Using the service to redistribute unauthorized copies</li>
            <li>Abusing the service with excessive automated requests</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="mb-4 text-2xl font-bold">4. Disclaimer</h2>
          <p>
            The service is provided as is. Users are responsible for verifying
            permissions and respecting applicable laws.
          </p>
        </section>
      </div>
    </div>
  );
}
