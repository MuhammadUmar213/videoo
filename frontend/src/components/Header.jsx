export default function Header() {
  const navItems = [
    ["Home", "/"],
    ["Downloader", "/download"],
    ["Tools", "/tools"],
    ["Blog", "/blog"],
    ["FAQ", "/faq"],
    ["Contact", "/contact"],
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="text-xl sm:text-2xl font-bold gradient-text">
          DownloadAnyVideo
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-gray-700 hover:text-blue-500 transition"
            >
              {label}
            </a>
          ))}
        </nav>

        <a href="/download" className="hidden sm:inline-flex btn-primary py-2 px-4">
          Start
        </a>
      </div>
    </header>
  );
}
