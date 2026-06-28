export default function DMCA() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">DMCA Takedown Notice</h1>

      <div className="space-y-6 text-gray-700">
        <section>
          <p className="text-lg font-bold">
            DownloadAnyVideo respects copyright law and the Digital Millennium
            Copyright Act (DMCA).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            Reporting Copyrighted Content
          </h2>
          <p>
            If you believe your copyrighted work has been infringed, please
            submit a DMCA takedown notice:
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p>
              <strong>Email:</strong> dmca@downloadanyvideo.com
            </p>
            <p className="mt-2">
              <strong>Include in your notice:</strong>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Your name and contact information</li>
              <li>Description of the copyrighted work</li>
              <li>URL of the infringing content</li>
              <li>Statement under penalty of perjury</li>
              <li>Your physical or electronic signature</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Our Response</h2>
          <p>Upon receiving a valid DMCA notice, we will:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Investigate the claim</li>
            <li>Remove or disable access to infringing content if warranted</li>
            <li>Notify the uploader if applicable</li>
            <li>Preserve evidence for legal proceedings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">False Claims</h2>
          <p>
            False DMCA claims may result in legal liability for damages and
            attorney fees.
          </p>
        </section>
      </div>

      <div className="mt-12 card">
        <h3 className="text-xl font-bold mb-4">Submit DMCA Takedown Notice</h3>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Your Email"
            className="input-primary w-full"
          />
          <textarea
            placeholder="Describe the copyrighted work..."
            className="input-primary w-full"
            rows="4"
          ></textarea>
          <input
            type="url"
            placeholder="URL of infringing content"
            className="input-primary w-full"
          />
          <button type="submit" className="btn-primary">
            Submit Notice
          </button>
        </form>
      </div>
    </div>
  );
}
