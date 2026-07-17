import { platforms, site } from "../data/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="mb-4 text-lg font-bold text-slate-950">
              {site.name}
            </h3>
            <p className="text-sm text-slate-600">
              Save permitted videos for offline viewing with clear format
              choices and no misleading download buttons.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Downloader</h4>
            <ul className="space-y-2 text-sm">
              {platforms.map((platform) => (
                <li key={platform.path}>
                  <a
                    href={platform.path}
                    className="text-slate-600 hover:text-fuchsia-600"
                  >
                    {platform.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="/blog" className="text-slate-600 hover:text-fuchsia-600">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-slate-600 hover:text-fuchsia-600"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/privacy"
                  className="text-slate-600 hover:text-fuchsia-600"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  className="text-slate-600 hover:text-fuchsia-600"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/dmca-copyright-policy"
                  className="text-slate-600 hover:text-fuchsia-600"
                >
                  DMCA Policy
                </a>
              </li>
              <li>
                <a
                  href="/cookie-policy"
                  className="text-slate-600 hover:text-fuchsia-600"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  className="text-slate-600 hover:text-fuchsia-600"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/contact"
                  className="text-slate-600 hover:text-fuchsia-600"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-slate-600 hover:text-fuchsia-600">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/dmca-copyright-policy"
                  className="text-slate-600 hover:text-fuchsia-600"
                >
                  Report DMCA
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-300 pt-8 text-center text-sm text-slate-600">
          <p>
            &copy; {currentYear} {site.name}. All rights reserved.
          </p>
          <p className="mt-2">
            Only download videos you have permission to download. Respect
            copyright laws.
          </p>
        </div>
      </div>
    </footer>
  );
}
