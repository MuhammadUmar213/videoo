import { Link } from "react-router";
import SEO from "../components/SEO";
import { platforms } from "../data/site";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <SEO
        title="Page not found | VidSavio"
        description="The page you were looking for does not exist. Browse the VidSavio downloader pages, blog, or support links instead."
        path="/404"
        noindex
      />

      <p className="font-mono text-sm font-bold uppercase tracking-widest text-fuchsia-600">
        Error 404
      </p>
      <h1 className="mt-4 text-4xl font-black text-slate-950 sm:text-5xl">
        We could not find that page
      </h1>
      <p className="mt-4 max-w-xl text-slate-600">
        The link may be out of date, or the address may have a typo. Everything
        below still works.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
        <Link to="/download" className="btn-secondary">
          Open the downloader
        </Link>
      </div>

      <div className="mt-12 w-full border-t border-slate-200 pt-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
          Downloader pages
        </h2>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {platforms.map((platform) => (
            <Link
              key={platform.path}
              to={platform.path}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-fuchsia-600 hover:text-fuchsia-600"
            >
              {platform.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
