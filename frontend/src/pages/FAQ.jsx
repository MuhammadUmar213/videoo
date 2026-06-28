import { useState } from "react";
import { AdBanner, AdResponsive } from "../components/AdPlaceholder";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Is DownloadAnyVideo free?",
      a: "Yes, completely free. No subscriptions or hidden fees.",
    },
    {
      q: "Do I need to install anything?",
      a: "No, it works directly in your browser.",
    },
    {
      q: "Is it safe to use?",
      a: "Yes, we do not store any personal data or cookies beyond analytics.",
    },
    {
      q: "What video qualities are available?",
      a: "We support 4K, 1080p, 720p, 480p, 360p, and audio-only formats.",
    },
    {
      q: "Can I download multiple videos at once?",
      a: "Yes, use our bulk download feature to paste multiple URLs.",
    },
    {
      q: "Which platforms are supported?",
      a: "YouTube, Instagram, Facebook, TikTok, Twitter/X, Vimeo, and 50+ others.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Ad Zone 1: Top Banner */}
      <div className="mb-8">
        <AdBanner />
      </div>

      <h1 className="text-4xl font-bold mb-12 gradient-text">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={`faq-section-${idx}`}>
            <div className="card">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left font-bold text-lg flex justify-between items-center"
              >
                {faq.q}
                <span className="text-blue-500">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>
              {openIndex === idx && (
                <p className="text-gray-600 mt-4">{faq.a}</p>
              )}
            </div>

            {/* Ad Zone 2: Between FAQs */}
            {idx === 2 && (
              <div key={`ad-faq-${idx}`} className="my-8">
                <AdResponsive />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
