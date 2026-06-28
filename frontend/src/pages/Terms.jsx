export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p>By using DownloadAnyVideo, you agree to these terms.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Permitted Use</h2>
          <p>Users may only download videos:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>That they own or have permission to download</li>
            <li>For personal, non-commercial use</li>
            <li>In compliance with local laws and regulations</li>
            <li>Respecting copyright and intellectual property rights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Prohibited Activities</h2>
          <p>Users must not:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Download copyrighted content without permission</li>
            <li>Violate terms of service of source platforms</li>
            <li>Use the service for commercial purposes</li>
            <li>
              Abuse the service with excessive requests (rate limiting applies)
            </li>
            <li>Distribute malware or engage in hacking</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Disclaimer</h2>
          <p>
            We provide the service "as is" without warranties. Users are
            responsible for their downloads.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            5. Limitation of Liability
          </h2>
          <p>
            We are not liable for damages or losses resulting from the use of
            this service.
          </p>
        </section>
      </div>
    </div>
  );
}
