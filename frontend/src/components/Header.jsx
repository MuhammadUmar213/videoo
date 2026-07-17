import { useState } from "react";
import { platforms, site } from "../data/site";

export default function Header() {
  const navItems = [
    ["Home", "/"],
    ["Blog", "/blog"],
    ["FAQ", "/faq"],
    ["Pricing", "/pricing"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-violet-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="text-xl font-black tracking-tight bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent sm:text-2xl"
        >
          {site.name}
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
          <a href="/" className="transition hover:text-fuchsia-600">
            Home
          </a>
          <div className="group relative">
            <button className="transition hover:text-fuchsia-600">
              Downloader
            </button>
            <div className="invisible absolute left-0 top-full w-64 rounded-lg border border-violet-200 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              {platforms.map((platform) => (
                <a
                  key={platform.path}
                  href={platform.path}
                  className="block rounded-md px-3 py-2 hover:bg-violet-50 hover:text-fuchsia-600"
                >
                  {platform.name}
                </a>
              ))}
            </div>
          </div>
          {navItems.map(([label, href]) =>
            label === "Home" ? null : (
              <a
                key={href}
                href={href}
                className="transition hover:text-fuchsia-600"
              >
                {label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/download"
            className="hidden rounded-md bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg sm:inline-flex"
          >
            Start
          </a>

          <button
            type="button"
            className="rounded-md border border-slate-200 p-2 text-slate-700 transition hover:border-fuchsia-600 hover:text-fuchsia-600 md:hidden"
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
            {platforms.map((platform) => (
              <a
                key={platform.path}
                href={platform.path}
                className="rounded-lg px-2 py-2 hover:bg-violet-50 hover:text-fuchsia-600"
              >
                {platform.name}
              </a>
            ))}
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-lg px-2 py-2 hover:bg-violet-50 hover:text-fuchsia-600"
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
