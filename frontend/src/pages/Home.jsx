import { AdBanner, AdSquare, AdResponsive } from "../components/AdPlaceholder";

export default function Home() {
  return (
    <div>
      {/* Ad Zone 1: Top Banner */}
      <div className="bg-blue-50 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <AdBanner />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Download Any Video
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Download videos from YouTube, Instagram, Facebook, TikTok, and 50+
            platforms
          </p>

          <div className="card pulse-glow mb-12">
            <input
              type="url"
              placeholder="Paste video URL here..."
              className="input-primary mb-4 w-full"
            />
            <button className="btn-primary w-full sm:w-auto">
              Download Now
            </button>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Supported Platforms
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "YouTube",
              "Instagram",
              "Facebook",
              "TikTok",
              "Twitter/X",
              "Vimeo",
              "Snapchat",
              "Pinterest",
            ].map((platform) => (
              <div key={platform} className="card text-center">
                <p className="font-bold text-gray-900">{platform}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "⚡ Fast", desc: "Download videos in seconds" },
              {
                title: "🎨 Beautiful",
                desc: "Modern, clean, easy-to-use interface",
              },
              { title: "🔒 Safe", desc: "No ads, no malware, no registration" },
              { title: "📱 Mobile Friendly", desc: "Works on all devices" },
              { title: "🌐 Multi-format", desc: "MP4, MP3, WEBM, and more" },
              { title: "⭐ Free", desc: "No subscriptions or fees" },
            ].map((feature) => (
              <div key={feature.title} className="card">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
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
