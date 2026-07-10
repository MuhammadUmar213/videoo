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

  const highlights = ["50+ Sites", "No Signup", "AdSense Ready"];

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = url ? `?url=${encodeURIComponent(url)}` : "";
    window.location.href = `/download${query}`;
  };

  return (
    <div className="overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3">
        <div className="mx-auto max-w-6xl">
          <AdBanner />
        </div>
      </div>

      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,180,255,0.13),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(255,45,120,0.11),_transparent_34%)]" />
        <div className="absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-slide-up">
            <p className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
              Free video downloader for 50+ platforms
            </p>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl gradient-text">
              Download Any Video
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl">
              Download videos from YouTube, Instagram, Facebook, TikTok, and 50+
              platforms with a clean, fast, mobile-friendly experience.
            </p>

            <form
              onSubmit={handleSubmit}
              className="card pulse-glow mt-8 rounded-2xl border-slate-200 p-5 shadow-xl shadow-blue-500/10"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="Paste video URL here..."
                  className="input-primary sm:flex-1"
                />
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Download Now
                </button>
              </div>
            </form>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-100 bg-white/80 px-3 py-4 text-center shadow-sm"
                >
                  <p className="text-sm font-bold text-slate-900">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual relative rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-2xl shadow-slate-200/70 backdrop-blur">
            <div className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-[1.4rem] bg-slate-950 p-4 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.25),_transparent_40%)] opacity-70" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Preview</span>
                  <span>MP4 - 1080p</span>
                </div>
                <div>
                  <div className="mb-3 h-3 w-3/4 rounded bg-white/80" />
                  <div className="h-2 w-1/2 rounded bg-white/40" />
                </div>
                <div className="h-2 rounded bg-white/20">
                  <div className="h-2 w-2/3 rounded gradient-primary" />
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["MP4", "MP3", "WEBM"].map((format) => (
                <div
                  key={format}
                  className="rounded-2xl bg-slate-50 p-3 text-center font-bold text-slate-800"
                >
                  {format}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Supported Platforms
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {platforms.map((platform) => (
              <div key={platform} className="card text-center">
                <p className="font-bold text-slate-900">{platform}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="card">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl gradient-primary text-sm font-bold text-white">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto max-w-6xl">
          <AdResponsive />
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
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
                <p className="font-bold text-slate-900">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
