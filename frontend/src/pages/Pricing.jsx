import SEO from "../components/SEO";
import { site } from "../data/site";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for quick checks and one-off permitted saves.",
    features: [
      "Basic format checks",
      "No account required",
      "Public-link friendly flow",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9/mo",
    description:
      "For power users handling repeated downloads and batch workflows.",
    features: [
      "Batch and playlist support",
      "Priority processing",
      "Download history",
    ],
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <div className="bg-white">
      <SEO
        title="Pricing | VidSavio"
        description="Transparent pricing for VidSavio's free and Pro download workflows."
        path="/pricing"
      />

      <section className="hero-gradient px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-violet-200">
            Simple pricing
          </p>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            Choose the workflow that fits your needs
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-violet-100">
            {site.name} keeps the basic experience simple and clear while offering
            premium tools for users who need repeat access and faster processing.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-8 shadow-sm ${
                tier.highlighted
                  ? "border-fuchsia-600 bg-fuchsia-50/70"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-950">
                  {tier.name}
                </h2>
                {tier.highlighted ? (
                  <span className="rounded-full bg-fuchsia-700 px-3 py-1 text-sm font-semibold text-white">
                    Most popular
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-slate-600">{tier.description}</p>
              <p className="mt-6 text-4xl font-black text-slate-950">
                {tier.price}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-fuchsia-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className={`mt-8 inline-flex rounded-md px-5 py-3 font-semibold transition ${
                  tier.highlighted
                    ? "bg-fuchsia-700 text-white hover:bg-fuchsia-800"
                    : "bg-white text-slate-900 ring-1 ring-slate-200 hover:text-fuchsia-600"
                }`}
              >
                {tier.name === "Free" ? "Get started" : "Request Pro access"}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-black text-slate-950">
            Built for responsible use
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Every workflow is designed around clear consent, permission-based
            use, and transparent terms so you can use VidSavio with confidence.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/terms-and-conditions"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800"
            >
              Review Terms
            </a>
            <a
              href="/privacy-policy"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
