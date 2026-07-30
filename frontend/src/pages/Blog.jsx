import { Link } from "react-router";
import SEO from "../components/SEO";
import { blogPosts, site } from "../data/site";

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${site.name} Blog`,
  url: `${site.domain}/blog`,
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${site.domain}/blog/${post.slug}`,
  })),
};

export default function Blog() {
  return (
    <div className="bg-white">
      <SEO
        title="VidSavio Blog - Legal Video Downloading Guides"
        description="Guides about permitted offline viewing, Creative Commons videos, and video format choices."
        path="/blog"
        schema={schema}
      />

      <section className="hero-gradient px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-black text-white sm:text-5xl">Blog</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-violet-100 sm:text-lg">
            Guides about permitted offline viewing, Creative Commons videos, and
            video format choices.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        {blogPosts.length === 0 ? (
          <p className="rounded-lg border border-slate-200 bg-slate-50 py-12 text-center font-semibold text-slate-600">
            No articles have been published yet. Check back soon.
          </p>
        ) : (
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <article key={post.slug} className="card">
                <h2 className="mb-2 text-2xl font-bold text-slate-950">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="hover:text-fuchsia-600"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mb-4 text-sm text-slate-500">
                  <time dateTime={post.date}>{post.date}</time>
                </p>
                <p className="mb-4 text-slate-600">{post.description}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-semibold text-fuchsia-600 hover:text-fuchsia-700"
                >
                  Read more
                  <span className="sr-only"> about {post.title}</span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
