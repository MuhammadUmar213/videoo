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

export const downloadVideo = async (url, format, quality) => {
  try {
    const { data } = await api.post("/download", { url, format, quality });
    return data;
  } catch (error) {
    throw toAppError(error, "Download failed");
  }
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
