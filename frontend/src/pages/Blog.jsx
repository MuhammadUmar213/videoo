import { AdBanner, AdResponsive } from "../components/AdPlaceholder";

export default function Blog() {
  const posts = [
    {
      slug: "how-to-download-youtube-videos",
      title: "How to Download YouTube Videos Safely",
      date: "2024-01-15",
    },
    {
      slug: "video-formats-explained",
      title: "Video Formats Explained: MP4 vs WebM",
      date: "2024-01-10",
    },
    {
      slug: "best-practices",
      title: "Best Practices for Video Downloading",
      date: "2024-01-05",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Ad Zone 1: Top Banner */}
      <div className="mb-8">
        <AdBanner />
      </div>

      <h1 className="text-4xl font-bold mb-12 gradient-text">Blog</h1>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div key={`blog-section-${post.slug}`}>
            <article className="card">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-4">{post.date}</p>
              <p className="text-gray-600 mb-4">
                Useful information about downloading videos safely...
              </p>
              <a
                href={`/blog/${post.slug}`}
                className="text-blue-500 hover:text-purple-600"
              >
                Read More →
              </a>
            </article>

            {/* Ad Zone 2: Between posts */}
            {index === 1 && (
              <div key={`ad-${index}`} className="my-8">
                <AdResponsive />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
