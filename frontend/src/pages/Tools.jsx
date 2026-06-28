export default function Tools() {
  const tools = [
    {
      name: "YouTube Downloader",
      desc: "Download videos from YouTube in any quality",
    },
    { name: "Instagram Reels", desc: "Save Reels, Stories, and Posts" },
    { name: "Facebook Downloader", desc: "Download videos from Facebook" },
    { name: "TikTok Downloader", desc: "Download TikToks without watermark" },
    { name: "Twitter/X Downloader", desc: "Save videos from Twitter/X" },
    { name: "MP3 Extractor", desc: "Convert videos to audio" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 gradient-text">
        Downloader Tools
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <div key={tool.name} className="card">
            <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
            <p className="text-gray-600 mb-4">{tool.desc}</p>
            <button className="btn-primary">Try Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
