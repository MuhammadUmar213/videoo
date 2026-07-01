import { useState } from "react";
import { AdBanner, AdResponsive } from "../components/AdPlaceholder";

export default function Home() {
  const [url, setUrl] = useState("");

  const platforms = [
    "YouTube",
    "Instagram",
    "Facebook",
    "TikTok",
    "Twitter/X",
    "Vimeo",
    "Snapchat",
    "Pinterest",
  ];

  const features = [
    {
      title: "Fast Processing",
      desc: "Fetch video details quickly with a clean download flow.",
      icon: "01",
    },
    {
      title: "Mobile Ready",
      desc: "Built for visitors coming from search, social, and mobile browsers.",
      icon: "02",
    },
    {
      title: "Multi Format",
      desc: "Prepare MP4, MP3, WEBM, and quality options from one place.",
      icon: "03",
    },
    {
      title: "Business Friendly",
      desc: "Ad zones and analytics are placed for future AdSense growth.",
      icon: "04",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = url ? `?url=${encodeURIComponent(url)}` : "";
    window.location.href = `/download${query}`;
  };

  return (
    <div>
      <div className="bg-gray-50 py-3 px-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <AdBanner />
        </div>
      </div>

      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,180,255,0.13),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(255,45,120,0.11),_transparent_34%)]" />
        <div className="relative max-w-7xl mx-auto py-16 lg:py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <p className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm border border-gray-100 mb-6">
              Free video downloader for 50+ platforms
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 gradient-text">
              Download Any Video
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
              Download videos from YouTube, Instagram, Facebook, TikTok, and 50+
              platforms with a clean, fast, mobile-friendly experience.
            </p>

            <form onSubmit={handleSubmit} className="card pulse-glow mb-8">
              <input
                type="url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="Paste video URL here..."
                className="input-primary mb-4 w-full"
              />
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Download Now
              </button>
            </form>

            <div className="grid grid-cols-3 gap-3 max-w-xl text-center">
              {["50+ Sites", "No Signup", "AdSense Ready"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg bg-white/80 border border-gray-100 px-3 py-4 shadow-sm"
                >
                  <p className="text-sm font-bold text-gray-900">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-white shadow-2xl shadow-blue-500/10 border border-gray-100 p-5">
            <div className="aspect-video rounded-lg bg-gray-900 p-4 text-white flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Preview</span>
                <span>MP4 - 1080p</span>
              </div>
              <div>
                <div className="h-3 w-3/4 bg-white/80 rounded mb-3" />
                <div className="h-2 w-1/2 bg-white/40 rounded" />
              </div>
              <div className="h-2 bg-white/20 rounded">
                <div className="h-2 w-2/3 gradient-primary rounded" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {["MP4", "MP3", "WEBM"].map((format) => (
                <div
                  key={format}
                  className="rounded-lg bg-gray-50 p-3 text-center font-bold text-gray-800"
                >
                  {format}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Supported Platforms
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platforms.map((platform) => (
              <div
                key={platform}
                className="card text-center hover:-translate-y-1 transition-transform"
              >
                <p className="font-bold text-gray-900">{platform}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card">
                <div className="w-11 h-11 rounded-lg gradient-primary text-white flex items-center justify-center font-bold mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <AdResponsive />
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Common Questions
          </h2>
          <div className="space-y-4">
            {[
              "Is it free?",
              "Do I need to register?",
              "Is it safe?",
              "What formats are supported?",
            ].map((q) => (
              <div key={q} className="card">
                <p className="font-bold text-gray-900">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
