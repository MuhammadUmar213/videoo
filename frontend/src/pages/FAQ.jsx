import { useState } from "react";
import SEO from "../components/SEO";

const faqs = [
  {
    q: "Is VidSavio free?",
    a: "VidSavio has a free basic flow. Subscription features such as batch or playlist workflows can be added separately.",
  },
  {
    q: "Do I need to install anything?",
    a: "No, it works directly in your browser.",
  },
  {
    q: "Is it safe to use?",
    a: "We keep the public flow simple, avoid forced redirects, and do not require login for basic use.",
  },
  {
    q: "What video qualities are available?",
    a: "Available qualities depend on the source video and platform. Common options include 1080p, 720p, 480p, 360p, and audio-only formats.",
  },
  {
    q: "Can I download multiple videos at once?",
    a: "Batch and playlist downloads are planned subscription features.",
  },
  {
    q: "Which platforms are supported?",
    a: "VidSavio includes focused pages for YouTube, Instagram Reels, Instagram videos, TikTok, and Facebook.",
  },
  {
    q: "What am I allowed to download?",
    a: "Only download content you own, content you have permission to download, or content that is Creative Commons, public domain, or otherwise lawfully available for offline saving.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-white">
      <SEO
        title="FAQ | VidSavio"
        description="Answers about VidSavio formats, permitted use, account requirements, and platform support."
        path="/faq"
        schema={schema}
      />

      <section className="hero-gradient px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-black text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-violet-100 sm:text-lg">
            Everything you need to know about VidSavio, formats, permissions,
            and supported platforms.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <ul className="list-none space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <li key={faq.q} className="card">
                <h2>
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 text-left text-lg font-bold text-slate-950"
                  >
                    {faq.q}
                    <svg
                      className={`h-5 w-5 shrink-0 text-fuchsia-600 transition-transform motion-reduce:transition-none ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <p className="mt-4 text-slate-600">{faq.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
