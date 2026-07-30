import { useId, useState } from "react";
import { useNavigate } from "react-router";

/**
 * The paste-and-check form shared by the home page and every platform landing
 * page. Both used to carry their own copy of this logic.
 */
export default function DownloadForm({
  placeholder = "Paste video URL here",
  className = "",
}) {
  const [url, setUrl] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputId = useId();
  const consentId = useId();
  const errorId = useId();

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setError("");
    } catch {
      // Clipboard access is denied by default in several browsers and always
      // over plain HTTP. Say so instead of failing silently.
      setError("Your browser blocked clipboard access. Paste the link manually.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!url.trim()) {
      setError("Please paste a video URL first.");
      return;
    }

    if (!agreed) {
      setError(
        "Please confirm you own the content or have permission to download it.",
      );
      return;
    }

    setError("");
    navigate(`/download?url=${encodeURIComponent(url.trim())}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`download-panel mx-auto ${className}`}
      noValidate
    >
      <label htmlFor={inputId} className="sr-only">
        Video URL
      </label>

      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-lg border border-white/30 bg-white/95 p-2 shadow-lg backdrop-blur sm:flex-row">
          <input
            id={inputId}
            type="url"
            inputMode="url"
            autoComplete="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              if (error) setError("");
            }}
            placeholder={placeholder}
            aria-describedby={error ? errorId : consentId}
            aria-invalid={error ? "true" : undefined}
            className="min-h-[52px] w-full min-w-0 flex-1 rounded-md border-0 px-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0 sm:px-4 sm:text-base"
          />
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <button type="button" onClick={pasteFromClipboard} className="utility-btn">
              Paste
            </button>
            <button
              type="button"
              onClick={() => {
                setUrl("");
                setError("");
              }}
              className="utility-btn"
            >
              Clear
            </button>
          </div>
        </div>
        <button type="submit" className="download-btn w-full lg:w-auto">
          Download
        </button>
      </div>

      <label
        htmlFor={consentId}
        className="mt-4 flex gap-3 rounded-lg bg-white/95 p-3 text-left text-xs font-medium leading-6 text-slate-700 shadow-md sm:bg-transparent sm:p-0 sm:text-sm sm:text-white sm:shadow-none"
      >
        <input
          id={consentId}
          type="checkbox"
          checked={agreed}
          onChange={(event) => {
            setAgreed(event.target.checked);
            if (error) setError("");
          }}
          className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500"
        />
        <span>
          I confirm I own this content or have permission from the copyright
          holder to download it.
        </span>
      </label>

      {/* Reserved height keeps the message from shifting the layout below it. */}
      <div className="mt-3 min-h-[1.5rem]" aria-live="polite">
        {error && (
          <p
            id={errorId}
            role="alert"
            className="rounded-md bg-white/95 px-3 py-2 text-sm font-semibold text-red-700 sm:bg-transparent sm:px-0 sm:py-0 sm:text-yellow-200"
          >
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
