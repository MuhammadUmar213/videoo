import { platforms, site } from "../data/site";

const authorLinkedInUrl = "https://www.linkedin.com/in/muhammad-umer-7b52b4228";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    color: "#1877F2",
    path: "M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z",
  },
  {
    name: "X",
    href: "https://twitter.com",
    color: "#000000",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.831L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.293 19.492h2.039L6.486 3.239H4.298l13.31 17.406Z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    color: "#E4405F",
    path: "M12 0C8.74 0 8.333.015 7.053.073 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.351.63 4.14C.333 4.905.131 5.775.073 7.053.014 8.333 0 8.74 0 12s.015 3.667.073 4.947c.059 1.277.26 2.148.557 2.913.306.788.717 1.459 1.384 2.126.667.666 1.337 1.079 2.126 1.384.765.297 1.636.499 2.913.557C8.333 23.986 8.74 24 12 24s3.667-.015 4.947-.073c1.277-.059 2.148-.26 2.913-.557.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.338 1.384-2.126.297-.765.499-1.636.557-2.913.059-1.28.073-1.687.073-4.947s-.015-3.667-.073-4.947c-.059-1.277-.26-2.148-.557-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.648.936 19.86.63c-.765-.297-1.636-.499-2.913-.557C15.667.014 15.26 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324Zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.846-10.405a1.441 1.441 0 1 1-2.882 0 1.441 1.441 0 0 1 2.882 0Z",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    color: "#FF0000",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z",
  },
  {
    name: "LinkedIn",
    href: authorLinkedInUrl,
    color: "#0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 lg:gap-12 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-lg font-bold text-white">{site.name}</h3>
            <p className="mx-auto max-w-sm text-sm text-violet-100 sm:mx-0">
              Save permitted videos for offline viewing with clear format
              choices and no misleading download buttons.
            </p>

            <div className="mt-6">
              <h4 className="font-bold text-white mb-3">Connect With Author</h4>
              <a
                href={authorLinkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 font-semibold text-[#0A66C2] transition hover:bg-violet-50"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Downloader</h4>
            <ul className="space-y-2 text-sm">
              {platforms.map((platform) => (
                <li key={platform.path}>
                  <a
                    href={platform.path}
                    className="text-violet-100 hover:text-yellow-400 transition"
                  >
                    {platform.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/blog"
                  className="text-violet-100 hover:text-yellow-400 transition"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-violet-100 hover:text-yellow-400 transition"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/privacy"
                  className="text-violet-100 hover:text-yellow-400 transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  className="text-violet-100 hover:text-yellow-400 transition"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/dmca-copyright-policy"
                  className="text-violet-100 hover:text-yellow-400 transition"
                >
                  DMCA Policy
                </a>
              </li>
              <li>
                <a
                  href="/cookie-policy"
                  className="text-violet-100 hover:text-yellow-400 transition"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  className="text-violet-100 hover:text-yellow-400 transition"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/contact"
                  className="text-violet-100 hover:text-yellow-400 transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-violet-100 hover:text-yellow-400 transition"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/dmca-copyright-policy"
                  className="text-violet-100 hover:text-yellow-400 transition"
                >
                  Report DMCA
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-violet-400/30 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="text-sm text-violet-100">
              <p>
                &copy; {currentYear} {site.name}. All rights reserved.
              </p>
              <p className="mt-1">
                Only download videos you have permission to download. Respect
                copyright laws.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 md:justify-end">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                  aria-label={social.name}
                  style={{ color: social.color }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
