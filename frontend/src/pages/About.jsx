export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 gradient-text">
        About DownloadAnyVideo
      </h1>

      <div className="space-y-6 text-gray-700">
        <p className="text-lg">
          DownloadAnyVideo is a modern, AdSense-friendly platform designed to
          help users download videos from popular social media platforms and
          video hosting sites.
        </p>

        <h2 className="text-2xl font-bold mt-8">Our Mission</h2>
        <p>
          We aim to provide a fast, secure, and user-friendly service for
          downloading videos with respect to copyright and intellectual property
          rights.
        </p>

        <h2 className="text-2xl font-bold mt-8">Features</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Support for 50+ platforms</li>
          <li>Multiple format options (MP4, MP3, WEBM)</li>
          <li>Quality selector (4K to 144p)</li>
          <li>No registration required</li>
          <li>Fast and reliable downloads</li>
          <li>Bulk download support</li>
          <li>Download history and favorites</li>
          <li>Progressive Web App (PWA) support</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">Legal Notice</h2>
        <p>
          Users are responsible for respecting copyright laws and the terms of
          service of the platforms they are downloading from. We do not support
          downloading copyrighted content without permission.
        </p>
      </div>
    </div>
  );
}
