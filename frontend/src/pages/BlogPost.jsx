import SEO from "../components/SEO";
import { blogPosts, site } from "../data/site";

export default function BlogPost({ slug }) {
  const post = blogPosts.find((item) => item.slug === slug) || blogPosts[0];
  const path = `/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: post.title,
    description: post.description,
    step: [
      {
        "@type": "HowToStep",
        name: "Confirm rights",
        text: "Verify that you own the content, have permission, or that the license allows downloading.",
      },
      {
        "@type": "HowToStep",
        name: "Paste the URL",
        text: "Paste the public video URL into VidSavio.",
      },
      {
        "@type": "HowToStep",
        name: "Choose a format",
        text: "Select the available MP4, audio, or quality option that fits your offline viewing need.",
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <SEO
        title={`${post.title} | ${site.name}`}
        description={post.description}
        path={path}
        schema={schema}
      />
      <p className="mb-3 text-sm font-semibold text-fuchsia-600">{post.date}</p>
      <h1 className="text-4xl font-black text-slate-950">{post.title}</h1>
      <p className="mt-5 text-lg text-slate-650">{post.description}</p>

      <div className="prose prose-slate mt-10 max-w-none">
        <h2>Start With Permission</h2>
        <p>
          Before saving any online video, confirm that you own it, have written
          permission, or that the license clearly allows offline use. Avoid
          reposting or redistributing saved files unless the license allows it.
        </p>
        <h2>Choose Practical Formats</h2>
        <p>
          MP4 is the best general format for offline viewing. Audio extraction
          should only be used when you have permission to save the audio track.
          Lower resolutions are useful for mobile storage and slow connections.
        </p>
        <h2>Use Platform Pages</h2>
        <p>
          VidSavio keeps platform guidance close to each downloader page so
          users understand the rules before checking available formats.
        </p>
      </div>

      <a className="btn-secondary mt-10 inline-flex" href={post.platformPath}>
        Open Related Downloader
      </a>
    </article>
  );
}
