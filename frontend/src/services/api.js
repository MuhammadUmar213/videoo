import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

// File transfers can be gigabytes. When the frontend is on a CDN and the
// backend elsewhere, sending them through the CDN's proxy burns metered
// bandwidth for no benefit, so point downloads straight at the backend.
// Metadata calls are small and stay on API_BASE so they can be proxied
// same-origin and avoid CORS entirely.
const DOWNLOAD_BASE = import.meta.env.VITE_DOWNLOAD_URL || API_BASE;

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

// Turn an axios failure into a plain Error carrying the server's message where
// there is one, while keeping the original error as `cause` for debugging.
const toAppError = (error, fallback) => {
  const message = error?.response?.data?.error || fallback;
  return new Error(message, { cause: error });
};

export const fetchVideoInfo = async (url) => {
  try {
    const { data } = await api.post("/fetch-info", { url });
    return data;
  } catch (error) {
    throw toAppError(error, "Failed to fetch video info");
  }
};

/**
 * Builds the URL the browser navigates to in order to receive the file. The
 * transfer is a plain GET so the browser owns the download, including its own
 * progress UI and resume behaviour.
 */
export const buildDownloadUrl = ({ url, formatId, ext, quality, title }) => {
  const params = new URLSearchParams({ url, formatId });
  if (ext) params.set("ext", ext);
  if (quality) params.set("quality", quality);
  if (title) params.set("title", title);

  // A top-level navigation, not a fetch, so this is not subject to CORS or
  // the page's connect-src.
  return `${DOWNLOAD_BASE}/download?${params.toString()}`;
};

export const getSupportedSites = async () => {
  try {
    const { data } = await api.get("/supported-sites");
    return data;
  } catch (error) {
    throw toAppError(error, "Failed to fetch supported sites");
  }
};

export const sendContactMessage = async (payload) => {
  try {
    const { data } = await api.post("/contact", payload);
    return data;
  } catch (error) {
    throw toAppError(error, "Could not send your message. Please try again.");
  }
};

export const getHealthCheck = async () => {
  try {
    const { data } = await api.get("/health");
    return data;
  } catch (error) {
    throw toAppError(error, "API is not available");
  }
};

export default api;
