import SEO from "../components/SEO";
import { site } from "../data/site";

export default function CookiePolicy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SEO
        title="Cookie Policy | VidSavio"
        description="Learn how VidSavio uses essential, analytics, and advertising cookies."
        path="/cookie-policy"
      />
      <h1 className="mb-4 text-4xl font-bold text-slate-950">Cookie Policy</h1>
      <p className="mb-8 text-slate-600">Last updated: July 17, 2026</p>

      <div className="space-y-6 text-slate-700">
        <section className="card">
          <h2 className="mb-3 text-2xl font-bold">How We Use Cookies</h2>
          <p>
            VidSavio uses essential cookies for site functionality, analytics
            cookies to understand aggregate traffic, and advertising cookies if
            ad partners are enabled.
          </p>
        </section>
        <section className="card">
          <h2 className="mb-3 text-2xl font-bold">Your Choices</h2>
          <p>
            You can block or delete cookies in your browser settings. Some
            functional parts of the service may not work correctly without
            essential cookies.
          </p>
        </section>
        <section className="card">
          <h2 className="mb-3 text-2xl font-bold">Contact</h2>
          <p>
            Questions about cookies can be sent to{" "}
            <a className="text-fuchsia-600" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
