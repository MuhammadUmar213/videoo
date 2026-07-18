import { platforms, site } from "../data/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">{site.name}</h3>
            <p className="text-sm text-violet-100">
              Save permitted videos for offline viewing with clear format
              choices and no misleading download buttons.
            </p>

            <div className="mt-6">
              <h4 className="font-bold text-white mb-3">Connect With Us</h4>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition"
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-violet-100">
              <p>
                &copy; {currentYear} {site.name}. All rights reserved.
              </p>
              <p className="mt-1">
                Only download videos you have permission to download. Respect
                copyright laws.
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-slate-900 hover:bg-fuchsia-600 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-slate-900 hover:bg-fuchsia-600 hover:text-white transition-all"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 002.856-3.915 10 10 0 01-2.8.56 4.934 4.934 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-slate-900 hover:bg-fuchsia-600 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 7a5 5 0 100 10 5 5 0 000-10z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-slate-900 hover:bg-fuchsia-600 hover:text-white transition-all"
                aria-label="YouTube"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
