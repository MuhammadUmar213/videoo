import { useState } from "react";
import SEO from "../components/SEO";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

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

  return (
    <div className="bg-white">
      <SEO
        title="FAQ | VidSavio"
        description="Answers about VidSavio formats, permitted use, account requirements, and platform support."
        path="/faq"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />

      <section className="hero-gradient px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-black text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-violet-100">
            Everything you need to know about VidSavio, formats, permissions,
            and supported platforms.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={`faq-section-${idx}`}>
              <div className="card">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 text-left text-lg font-bold"
                >
                  {faq.q}
                  <span className="text-fuchsia-600">
                    {openIndex === idx ? "-" : "+"}
                  </span>
                </button>
                {openIndex === idx && (
                  <p className="mt-4 text-slate-600">{faq.a}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
