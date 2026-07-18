import SEO from "../components/SEO";
import { blogPosts } from "../data/site";

export default function Blog() {
  return (
    <div className="bg-white">
      <SEO
        title="VidSavio Blog - Legal Video Downloading Guides"
        description="Guides about permitted offline viewing, Creative Commons videos, and video format choices."
        path="/blog"
      />

      <section className="hero-gradient px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-black text-white sm:text-5xl">Blog</h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-violet-100">
            Guides about permitted offline viewing, Creative Commons videos, and
            video format choices.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
