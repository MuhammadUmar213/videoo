export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 gradient-text">Privacy Policy</h1>
      <p className="text-gray-600 mb-8">Last updated: June 6, 2026</p>

      <div className="space-y-6 text-gray-700">
        <section className="card">
          <h2 className="text-2xl font-bold mb-4">1. Overview</h2>
          <p>
            DownloadAnyVideo ("we," "us," or "our") operates as a free online
            video downloader service. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information.
          </p>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">
                📊 Automatically Collected Information:
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Browser Data:</strong> IP address (hashed), browser
                  type, pages visited
                </li>
                <li>
                  <strong>Download Logs:</strong> URL hash, format, quality,
                  timestamp
                </li>
                <li>
                  <strong>Cookies:</strong> Session cookies for functionality
                </li>
                <li>
                  <strong>Analytics:</strong> Google Analytics 4 tracking
                  (anonymized)
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm">
                <strong>✅ What We DON'T Collect:</strong> Credit cards,
                passwords, or unnecessary data
              </p>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>✅ Improve service quality and reliability</li>
            <li>✅ Track popular platforms and trends</li>
            <li>✅ Prevent abuse via rate limiting</li>
            <li>✅ Display public analytics</li>
            <li>✅ Respond to your inquiries</li>
            <li>✅ Comply with legal obligations</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold mb-4">
            4. Data Storage & Security
          </h2>
          <div className="space-y-3">
            <p>
              <strong>Browser Storage:</strong> Download history stored locally
              in your browser
            </p>
            <p>
              <strong>Server Storage:</strong> Analytics data in MongoDB with
              security
            </p>
            <p>
              <strong>Retention:</strong> Download logs kept 90 days, then
              deleted
            </p>
            <p>
              <strong>Encryption:</strong> HTTPS/SSL for all data in transit
            </p>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold mb-4">5. Cookies & Tracking</h2>
          <div className="space-y-3">
            <p>
              <strong>Session Cookies:</strong> For functionality (required)
            </p>
            <p>
              <strong>Analytics:</strong> Google Analytics 4 (optional)
            </p>
            <p className="text-sm text-gray-600">
              You can disable cookies in browser settings
            </p>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
          <ul className="space-y-2">
            <li>📊 Google Analytics - Traffic analysis</li>
            <li>🎯 Google AdSense - Advertisements</li>
            <li>💾 MongoDB - Database hosting</li>
            <li>☁️ Cloud Platforms - Deployment</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
          <div className="space-y-3">
            <p>
              <strong>🔍 Right to Know:</strong> What data we collect
            </p>
            <p>
              <strong>🗑️ Right to Delete:</strong> Request data deletion
            </p>
            <p>
              <strong>📋 Right to Access:</strong> Get a copy of your data
            </p>
            <p className="text-sm text-gray-600">
              Contact: privacy@downloadanyvideo.com
            </p>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
          <p>
            DownloadAnyVideo is not for children under 13. We don't knowingly
            collect data from children.
          </p>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
          <div className="space-y-2">
            <p>
              <strong>📧 Email:</strong> privacy@downloadanyvideo.com
            </p>
            <p>
              <strong>💬 Form:</strong>{" "}
              <a
                href="/contact"
                className="text-blue-500 hover:text-purple-600"
              >
                Contact Us
              </a>
            </p>
            <p>
              <strong>⚖️ DMCA:</strong> dmca@downloadanyvideo.com
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
