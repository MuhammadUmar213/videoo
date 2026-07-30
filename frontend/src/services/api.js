import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

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

  return `${API_BASE}/download?${params.toString()}`;
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
