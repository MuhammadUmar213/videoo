import { Link, useParams } from "react-router";
import SEO from "../components/SEO";
import NotFound from "./NotFound";
import { blogPosts, site } from "../data/site";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  // Previously an unknown slug silently rendered the first article, which
  // served a 200 for a URL that does not exist.
  if (!post) {
    return <NotFound />;
  }

  const path = `/blog/${post.slug}`;
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.domain}${path}`,
  };

  return (
    <div className="bg-white">
      <SEO
        title={`${post.title} | ${site.name}`}
        description={post.description}
        path={path}
        schema={schema}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <Link to="/blog" className="font-semibold text-fuchsia-600 hover:text-fuchsia-700">
            &larr; All articles
          </Link>
        </nav>

        <p className="mb-3 text-sm font-semibold text-fuchsia-600">
          <time dateTime={post.date}>{post.date}</time>
        </p>
        <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg text-slate-600">{post.description}</p>

        <div className="mt-10 space-y-8">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-slate-950">
                {section.heading}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-4 leading-7 text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <Link className="btn-secondary inline-flex" to={post.platformPath}>
            Open related downloader
          </Link>
        </div>

        {relatedPosts.length > 0 && (
          <aside className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Keep reading
            </h2>
            <ul className="mt-4 space-y-3">
              {relatedPosts.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/blog/${item.slug}`}
                    className="font-semibold text-slate-800 hover:text-fuchsia-600"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </div>
  );
}
