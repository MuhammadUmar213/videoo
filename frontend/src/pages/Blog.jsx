import { AdBanner, AdResponsive } from "../components/AdPlaceholder";
import SEO from "../components/SEO";
import { blogPosts } from "../data/site";

export default function Blog() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SEO
        title="VidSavio Blog - Legal Video Downloading Guides"
        description="Guides about permitted offline viewing, Creative Commons videos, and video format choices."
        path="/blog"
      />
      <div className="mb-8">
        <AdBanner />
      </div>

      <h1 className="mb-12 text-4xl font-bold text-slate-950">Blog</h1>
      <div className="space-y-6">
        {blogPosts.map((post, index) => (
          <div key={`blog-section-${post.slug}`}>
            <article className="card">
              <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
              <p className="mb-4 text-sm text-slate-500">{post.date}</p>
              <p className="mb-4 text-slate-600">{post.description}</p>
              <a
                href={`/blog/${post.slug}`}
                className="font-semibold text-fuchsia-600 hover:text-fuchsia-700"
              >
                Read More
              </a>
            </article>

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
