import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Client-side navigation keeps the previous scroll position, so moving from
 * the bottom of one page to another lands the reader mid-content. Reset on
 * every path change, but leave in-page anchor jumps alone.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [pathname, hash]);

  return null;
}
