export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold gradient-text">
          DownloadAnyVideo
        </a>

        <nav className="hidden md:flex gap-8">
          <a href="/" className="text-gray-700 hover:text-blue-500 transition">
            Home
          </a>
          <a
            href="/download"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Downloader
          </a>
          <a
            href="/tools"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Tools
          </a>
          <a
            href="/blog"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Blog
          </a>
          <a
            href="/faq"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            FAQ
          </a>
          <a
            href="/contact"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Contact
          </a>
        </nav>

        <div className="md:hidden">
          <button className="text-gray-700 hover:text-blue-500">☰</button>
        </div>
      </div>
    </header>
  );
}
