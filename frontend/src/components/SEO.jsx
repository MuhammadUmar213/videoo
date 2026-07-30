import { useEffect } from "react";
import { site } from "../data/site";

const upsertMeta = (selector, attrs) => {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    document.head.appendChild(node);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });

  return node;
};

const upsertLink = (rel, href) => {
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", rel);
    document.head.appendChild(node);
  }

  node.setAttribute("href", href);
};

export default function SEO({
  title,
  description,
  path = "/",
  schema,
  noindex = false,
}) {
  useEffect(() => {
    const canonicalUrl = `${site.domain}${path}`;
    const imageUrl = `${site.domain}/og-image.png`;

    document.title = title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });

    // Without this, a page that opted out of indexing keeps the previous
    // page's directive after a client-side navigation.
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex ? "noindex,nofollow" : "index,follow",
    });

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: `${site.name} — video downloader for permitted offline viewing`,
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });

    upsertLink("canonical", canonicalUrl);
  }, [title, description, path, noindex]);

  useEffect(() => {
    const existing = document.head.querySelector("#structured-data");
    if (existing) {
      existing.remove();
    }

    if (!schema) {
      return undefined;
    }

    const script = document.createElement("script");
    script.id = "structured-data";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [schema]);

  return null;
}
