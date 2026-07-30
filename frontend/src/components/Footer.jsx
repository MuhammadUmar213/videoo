import { Link } from "react-router";
import { platforms, site, socialLinks } from "../data/site";

const columns = [
  {
    title: "Downloader",
    links: [
      ...platforms.map((platform) => [platform.name, platform.path]),
      ["Blog", "/blog"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/privacy-policy"],
      ["Terms & Conditions", "/terms-and-conditions"],
      ["DMCA Policy", "/dmca-copyright-policy"],
      ["Cookie Policy", "/cookie-policy"],
      ["Disclaimer", "/disclaimer"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Contact Us", "/contact"],
      ["FAQ", "/faq"],
      ["Report DMCA", "/dmca-copyright-policy"],
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hero-gradient mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="mb-4 text-lg font-bold text-white">{site.name}</h2>
            <p className="mx-auto max-w-sm text-sm text-violet-100 sm:mx-0">
              Save permitted videos for offline viewing with clear format
              choices and no misleading download buttons.
            </p>

            <div className="mt-6">
              <h3 className="mb-3 font-bold text-white">Connect With Author</h3>
              <a
                href={site.authorLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 font-semibold text-[#0A66C2] transition hover:bg-violet-50"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-4 font-bold text-white">{column.title}</h2>
              <ul className="space-y-2 text-sm">
                {column.links.map(([label, href]) => (
                  <li key={`${column.title}-${label}`}>
                    <Link
                      to={href}
                      className="text-violet-100 transition hover:text-yellow-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-violet-400/30 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="text-sm text-violet-100">
              <p>
                &copy; {currentYear} {site.name}. All rights reserved.
              </p>
              <p className="mt-1">
                Only download videos you have permission to download. Respect
                copyright laws.
              </p>
            </div>

            <ul className="flex flex-wrap justify-center gap-3 md:justify-end">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:hover:translate-y-0"
                    style={{ color: social.color }}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d={social.path} />
                    </svg>
                    <span className="sr-only">
                      {social.name} (opens in a new tab)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
