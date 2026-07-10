import { useState } from "react";

export default function Header() {
  const navItems = [
    ["Home", "/"],
    ["Downloader", "/download"],
    ["Tools", "/tools"],
    ["Blog", "/blog"],
    ["FAQ", "/faq"],
    ["Contact", "/contact"],
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="text-xl font-black tracking-tight gradient-text sm:text-2xl"
        >
          VideoDownloadingplace
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="transition hover:text-blue-500"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/download"
            className="hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 sm:inline-flex"
          >
            Start
          </a>

          <button
            type="button"
            className="rounded-full border border-slate-200 p-2 text-slate-700 transition hover:border-blue-500 hover:text-blue-500 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-slate-700">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-lg px-2 py-2 hover:bg-slate-50 hover:text-blue-500"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
