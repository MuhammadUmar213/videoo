export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 gradient-text">
              DownloadAnyVideo
            </h3>
            <p className="text-gray-600 text-sm">
              Download videos from 50+ platforms in multiple formats and
              qualities.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/tools" className="text-gray-600 hover:text-blue-500">
                  Tools
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-blue-500">
                  Blog
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-blue-500">
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Contact
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
                  className="text-gray-600 hover:text-blue-500"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-blue-500">
                  Terms
                </a>
              </li>
              <li>
                <a href="/dmca" className="text-gray-600 hover:text-blue-500">
                  DMCA
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
                  className="text-gray-600 hover:text-blue-500"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 hover:text-blue-500">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/dmca" className="text-gray-600 hover:text-blue-500">
                  Report DMCA
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} DownloadAnyVideo. All rights reserved.</p>
          <p className="mt-2">
            ⚠️ Only download videos you have permission to download. Respect
            copyright laws.
          </p>
        </div>
      </div>
    </footer>
  );
}
