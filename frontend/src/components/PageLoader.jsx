/**
 * Suspense fallback for lazily loaded routes. Sized to roughly the height of a
 * page hero so swapping it for real content does not shift the layout.
 */
export default function PageLoader() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        <span
          className="h-9 w-9 animate-spin rounded-full border-4 border-violet-200 border-t-fuchsia-600 motion-reduce:animate-none"
          aria-hidden="true"
        />
        <span className="text-sm font-semibold text-slate-600">Loading…</span>
      </div>
    </div>
  );
}
