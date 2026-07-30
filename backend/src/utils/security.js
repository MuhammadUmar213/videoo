import crypto from "crypto";

const isProduction = process.env.NODE_ENV === "production";

// Hostnames we are willing to accept a video URL for. Anything else is
// rejected before it can reach an outbound fetch (yt-dlp, oEmbed, etc.).
const supportedHosts = [
  "youtube.com",
  "youtu.be",
  "instagram.com",
  "facebook.com",
  "fb.watch",
  "tiktok.com",
  "twitter.com",
  "x.com",
  "vimeo.com",
  "snapchat.com",
  "pinterest.com",
  "pin.it",
  "twitch.tv",
];

const allowedProtocols = new Set(["http:", "https:"]);
const allowedPorts = new Set(["", "80", "443"]);

// Loopback, link-local, and RFC1918 ranges. Blocking these keeps the endpoint
// from being used to probe the metadata service or other internal hosts.
const privateIpv4 =
  /^(0\.|10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.)/;
const privateHostname = /^(localhost|.*\.localhost|.*\.local|.*\.internal)$/i;

const resolveHashSecret = () => {
  const secret = process.env.HASH_SECRET;

  if (secret && secret.length >= 32) {
    return secret;
  }

  if (isProduction) {
    // Fail closed: a weak or missing pepper means the stored hashes are
    // reversible, which silently turns the analytics table into a PII store.
    throw new Error(
      "HASH_SECRET must be set to at least 32 characters in production",
    );
  }

  console.warn(
    "HASH_SECRET is not set; using an ephemeral development secret. " +
      "Hashes will not be stable across restarts.",
  );
  return crypto.randomBytes(32).toString("hex");
};

let cachedSecret = null;

const getHashSecret = () => {
  if (!cachedSecret) {
    cachedSecret = resolveHashSecret();
  }

  return cachedSecret;
};

/**
 * Keyed one-way digest for values we store but never need to read back
 * (IP addresses, source URLs). Unlike an unkeyed hash, an attacker with a
 * copy of the database cannot brute-force the input without the secret.
 */
export const hashValue = (value) => {
  if (typeof value !== "string" || !value) {
    return null;
  }

  return crypto
    .createHmac("sha256", getHashSecret())
    .update(value)
    .digest("hex");
};

const isPrivateHost = (hostname) => {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();

  if (privateHostname.test(host)) {
    return true;
  }

  if (privateIpv4.test(host)) {
    return true;
  }

  // IPv6 loopback (::1), unique local (fc00::/7), and link-local (fe80::/10).
  if (host === "::1" || /^f[cd][0-9a-f]{2}:/.test(host) || /^fe[89ab][0-9a-f]:/.test(host)) {
    return true;
  }

  // IPv4-mapped IPv6, e.g. ::ffff:127.0.0.1
  const mapped = host.match(/^::ffff:(.+)$/);
  if (mapped && privateIpv4.test(mapped[1])) {
    return true;
  }

  return false;
};

const isSupportedHost = (hostname) => {
  const host = hostname.toLowerCase().replace(/\.$/, "");

  return supportedHosts.some(
    (site) => host === site || host.endsWith(`.${site}`),
  );
};

/**
 * Parses a user-supplied video URL and returns it only if it is a plain
 * http(s) link on a standard port, pointing at a supported public platform
 * rather than an internal address.
 */
export const parseVideoUrl = (url) => {
  if (typeof url !== "string" || !url.trim() || url.length > 2048) {
    return null;
  }

  let parsed;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }

  if (!allowedProtocols.has(parsed.protocol)) {
    return null;
  }

  if (!allowedPorts.has(parsed.port)) {
    return null;
  }

  // Credentials in the URL are only ever useful for smuggling a different
  // host past a naive check, so reject them outright.
  if (parsed.username || parsed.password) {
    return null;
  }

  if (isPrivateHost(parsed.hostname) || !isSupportedHost(parsed.hostname)) {
    return null;
  }

  return parsed;
};

export const getPlatformFromUrl = (url) => {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    return supportedHosts.find(
      (site) => host === site || host.endsWith(`.${site}`),
    ) || "unknown";
  } catch {
    return "unknown";
  }
};

export const supportedSites = supportedHosts;

/**
 * Called at boot so a misconfigured production deployment fails immediately
 * instead of quietly writing reversible hashes.
 */
export const assertSecurityConfig = () => {
  getHashSecret();
};
