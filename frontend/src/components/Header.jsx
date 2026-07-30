import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { platforms, site } from "../data/site";

const navItems = [
  ["Home", "/"],
  ["Blog", "/blog"],
  ["FAQ", "/faq"],
  ["Pricing", "/pricing"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

const navLinkClass = ({ isActive }) =>
  `transition hover:text-fuchsia-600 ${
    isActive ? "text-fuchsia-600" : "text-slate-700"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `rounded-lg px-2 py-2 transition hover:bg-violet-50 hover:text-fuchsia-600 ${
    isActive ? "bg-violet-50 text-fuchsia-600" : "text-slate-700"
  }`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);
  const { pathname } = useLocation();

  // Client-side navigation leaves both menus open otherwise, since nothing
  // reloads the page any more.
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isDropdownOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        dropdownButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-violet-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-xl font-black tracking-tight text-transparent sm:text-2xl"
        >
          {site.name}
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 text-sm font-semibold md:flex"
        >
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              ref={dropdownButtonRef}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              aria-controls="platform-menu"
              className="flex items-center gap-1 text-slate-700 transition hover:text-fuchsia-600"
            >
              Downloader
              <svg
                className={`h-4 w-4 transition-transform motion-reduce:transition-none ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div
                id="platform-menu"
                className="absolute left-0 top-full mt-1 w-64 rounded-lg border border-violet-200 bg-white p-2 shadow-xl"
              >
                {platforms.map((platform) => (
                  <NavLink
                    key={platform.path}
                    to={platform.path}
                    className={mobileLinkClass}
                    style={{ display: "block" }}
                  >
                    {platform.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {navItems
            .filter(([label]) => label !== "Home")
            .map(([label, href]) => (
              <NavLink key={href} to={href} className={navLinkClass}>
                {label}
              </NavLink>
            ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/download"
            className="hidden rounded-md bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg sm:inline-flex"
          >
            Start
          </Link>

          <button
            type="button"
            className="rounded-md border border-slate-200 p-2 text-slate-700 transition hover:border-fuchsia-600 hover:text-fuchsia-600 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18 18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-1 text-sm font-semibold"
          >
            <Link
              to="/download"
              className="mb-2 rounded-md bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-2.5 text-center font-semibold text-white shadow-md sm:hidden"
            >
              Start downloading
            </Link>
            {platforms.map((platform) => (
              <NavLink
                key={platform.path}
                to={platform.path}
                className={mobileLinkClass}
              >
                {platform.name}
              </NavLink>
            ))}
            <span className="my-1 border-t border-slate-200" aria-hidden="true" />
            {navItems.map(([label, href]) => (
              <NavLink
                key={href}
                to={href}
                end={href === "/"}
                className={mobileLinkClass}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
