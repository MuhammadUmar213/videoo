import { spawn } from "child_process";

const YT_DLP_PATH = process.env.YT_DLP_PATH || "yt-dlp";
const FFMPEG_PATH = process.env.FFMPEG_PATH || "ffmpeg";
// The standalone yt-dlp build is a PyInstaller bundle that unpacks itself on
// every invocation, which costs 8-12s before any work starts. Timeouts have to
// clear that floor or the tool looks broken when it is merely slow to boot.
const STARTUP_ALLOWANCE_MS = Number(process.env.YT_DLP_STARTUP_MS || 20000);
const METADATA_TIMEOUT_MS = Number(process.env.YT_DLP_TIMEOUT_MS || 60000);
const MAX_CONCURRENT = Number(process.env.YT_DLP_MAX_CONCURRENT || 2);

// yt-dlp format ids are short alphanumeric tokens ("137", "251", "18-drc").
// Anything else is refused before it can reach the argument list.
const FORMAT_ID_PATTERN = /^[A-Za-z0-9_.+-]{1,64}$/;

/**
 * Environment for the spawned tool.
 *
 * The standalone build unpacks its bundled libraries into a temporary
 * directory and loads them from there, so that directory has to allow
 * execution. Shared hosts routinely mount /tmp noexec, which surfaces as
 * "libz.so.1: failed to map segment from shared object" — a linker error that
 * reads like a corrupt download rather than a permissions problem.
 *
 * Point YT_DLP_TMPDIR at a writable, executable path (somewhere under the
 * account's home on such hosts) and it is passed down explicitly, rather than
 * relying on the platform to forward a TMPDIR of its own.
 */
const spawnEnv = () => {
  const tmpdir = process.env.YT_DLP_TMPDIR;
  if (!tmpdir) {
    return process.env;
  }

  return { ...process.env, TMPDIR: tmpdir, TMP: tmpdir, TEMP: tmpdir };
};

/**
 * Extra flags appended to every yt-dlp call, from YT_DLP_EXTRA_ARGS.
 *
 * Platforms block datacenter address ranges, and a server that works from a
 * home connection can be refused from a host with "Sign in to confirm you're
 * not a bot". What gets around it changes over time — a different player
 * client, an exported cookie jar, a proxy — so it belongs in configuration
 * rather than in a code change and a redeploy each time. Examples:
 *
 *   --extractor-args youtube:player_client=android,ios
 *   --cookies /home/user/cookies.txt
 *   --proxy http://user:pass@host:port
 *
 * Operator-supplied, not user-supplied: it is split on whitespace and passed
 * through as-is, so quoted arguments containing spaces are not supported.
 */
const extraArgs = () => {
  const raw = process.env.YT_DLP_EXTRA_ARGS;
  return raw ? raw.trim().split(/\s+/).filter(Boolean) : [];
};

const QUALITY_BY_HEIGHT = [
  [2160, "4K"],
  [1440, "1440p"],
  [1080, "1080p"],
  [720, "720p"],
  [480, "480p"],
  [360, "360p"],
  [240, "240p"],
];

class ToolUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.status = 503;
  }
}

class ExtractionError extends Error {
  constructor(message) {
    super(message);
    this.status = 502;
  }
}

/**
 * Runs a binary with a fixed argument list. Never uses a shell, so nothing in
 * `args` can be interpreted as a command — the whole user-controlled surface
 * here is a URL and a format id.
 */
const run = (command, args, { timeoutMs, maxBuffer = 32 * 1024 * 1024 } = {}) =>
  new Promise((resolve, reject) => {
    let child;
    try {
      child = spawn(command, args, {
        shell: false,
        windowsHide: true,
        env: spawnEnv(),
      });
    } catch (error) {
      reject(new ToolUnavailableError(`Could not start ${command}`, { cause: error }));
      return;
    }

    const stdout = [];
    const stderr = [];
    let size = 0;
    let settled = false;

    const timer = timeoutMs
      ? setTimeout(() => {
          settled = true;
          child.kill("SIGKILL");
          reject(new ExtractionError("The video service did not respond in time"));
        }, timeoutMs)
      : null;

    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      fn(value);
    };

    child.stdout.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBuffer) {
        child.kill("SIGKILL");
        finish(reject, new ExtractionError("Metadata response was unexpectedly large"));
        return;
      }
      stdout.push(chunk);
    });

    child.stderr.on("data", (chunk) => stderr.push(chunk));

    child.on("error", (error) => {
      finish(
        reject,
        error.code === "ENOENT"
          ? new ToolUnavailableError(`${command} is not installed on this server`)
          : new ExtractionError(`Could not run ${command}`),
      );
    });

    child.on("close", (code) => {
      if (code === 0) {
        finish(resolve, Buffer.concat(stdout).toString("utf8"));
        return;
      }
      finish(
        reject,
        new ExtractionError(
          summariseFailure(Buffer.concat(stderr).toString("utf8")),
        ),
      );
    });
  });

/**
 * yt-dlp writes multi-line diagnostics that often name internal paths. Reduce
 * them to something a visitor can act on.
 */
const summariseFailure = (stderr) => {
  const text = stderr.toLowerCase();

  if (text.includes("private video") || text.includes("login required")) {
    return "That video is private. Only public videos can be checked.";
  }
  if (text.includes("video unavailable") || text.includes("does not exist")) {
    return "That video is unavailable or the link is wrong.";
  }
  if (text.includes("age") && text.includes("restrict")) {
    return "That video is age restricted and cannot be checked.";
  }
  if (text.includes("geo") || text.includes("not available in your country")) {
    return "That video is not available from this server's region.";
  }
  if (text.includes("unsupported url")) {
    return "That link is not supported.";
  }
  if (text.includes("sign in to confirm") || text.includes("bot")) {
    return "The platform is asking this server to verify itself. Try again later.";
  }

  return "Could not read that video's details. Check the link and try again.";
};

let toolCache = null;

/** Probes for yt-dlp and ffmpeg once, then reuses the result. */
export const probeTools = async () => {
  if (toolCache) {
    return toolCache;
  }

  // yt-dlp answers to --version, ffmpeg to -version. Try the flag the tool
  // actually uses first: a wrong guess costs a whole startup cycle.
  const check = async (command, flags) => {
    for (const flag of flags) {
      try {
        const out = await run(command, [flag], {
          timeoutMs: STARTUP_ALLOWANCE_MS,
          maxBuffer: 1 << 20,
        });
        const line = out.trim().split("\n")[0];
        if (line) {
          return line;
        }
      } catch {
        // Fall through to the next flag.
      }
    }
    return null;
  };

  const [ytDlp, ffmpeg] = await Promise.all([
    check(YT_DLP_PATH, ["--version"]),
    check(FFMPEG_PATH, ["-version", "--version"]),
  ]);

  toolCache = { ytDlp, ffmpeg };

  if (!ytDlp) {
    console.warn(
      "yt-dlp was not found. Video endpoints will report the downloader as unavailable. " +
        "Install yt-dlp or set YT_DLP_PATH.",
    );
  } else if (!ffmpeg) {
    console.warn(
      "ffmpeg was not found. Only single-file formats will be offered; " +
        "high-resolution formats that need muxing will be hidden.",
    );
  }

  return toolCache;
};

export const isDownloaderAvailable = async () => Boolean((await probeTools()).ytDlp);

const qualityLabel = (format) => {
  if (format.vcodec === "none") {
    return "audio";
  }

  const height = format.height || 0;
  const match = QUALITY_BY_HEIGHT.find(([min]) => height >= min);
  return match ? match[1] : `${height || "?"}p`;
};

/**
 * Keeps only formats this server can actually deliver. Without ffmpeg that
 * means single-file formats: video-only streams would arrive silent, which is
 * worse than not offering them.
 */
const selectFormats = (rawFormats, { hasFfmpeg }) => {
  const usable = (rawFormats || []).filter((format) => {
    if (!format.format_id || !FORMAT_ID_PATTERN.test(format.format_id)) return false;
    if (format.ext === "mhtml") return false;

    const hasVideo = format.vcodec && format.vcodec !== "none";
    const hasAudio = format.acodec && format.acodec !== "none";

    if (hasVideo && hasAudio) return true;
    if (!hasVideo && hasAudio) return true;
    return hasVideo && hasFfmpeg;
  });

  // One entry per quality, preferring the largest known file size.
  const best = new Map();
  for (const format of usable) {
    const quality = qualityLabel(format);
    const key = `${quality}-${format.ext}`;
    const size = format.filesize || format.filesize_approx || 0;
    const current = best.get(key);
    if (!current || size > current.size) {
      best.set(key, {
        quality,
        format: format.ext,
        formatId: format.format_id,
        size,
        needsMerge: Boolean(
          format.vcodec && format.vcodec !== "none" &&
          (!format.acodec || format.acodec === "none"),
        ),
      });
    }
  }

  const order = ["4K", "1440p", "1080p", "720p", "480p", "360p", "240p", "audio"];
  return [...best.values()]
    .sort((a, b) => order.indexOf(a.quality) - order.indexOf(b.quality))
    .map(({ quality, format, formatId, size, needsMerge }) => ({
      quality,
      format,
      formatId,
      filesize: size || null,
      needsMerge,
    }));
};

/** Maps a yt-dlp `-J` payload onto the shape the frontend already consumes. */
export const mapMetadata = (payload, { hasFfmpeg = false } = {}) => {
  if (!payload || typeof payload !== "object") {
    throw new ExtractionError("Could not read that video's details.");
  }

  const thumbnail =
    payload.thumbnail ||
    (Array.isArray(payload.thumbnails) && payload.thumbnails.length
      ? payload.thumbnails[payload.thumbnails.length - 1].url
      : null);

  return {
    id: payload.id || null,
    title: payload.title || "Untitled video",
    duration: Number.isFinite(payload.duration) ? payload.duration : null,
    thumbnail: typeof thumbnail === "string" ? thumbnail : null,
    uploader: payload.uploader || payload.channel || null,
    formats: selectFormats(payload.formats, { hasFfmpeg }),
  };
};

export const fetchMetadata = async (url) => {
  const { ytDlp, ffmpeg } = await probeTools();

  if (!ytDlp) {
    throw new ToolUnavailableError(
      "The download service is not configured on this server yet.",
    );
  }

  const raw = await run(
    YT_DLP_PATH,
    [
      "--dump-single-json",
      "--no-playlist",
      "--no-warnings",
      "--no-progress",
      "--socket-timeout",
      "15",
      ...extraArgs(),
      "--",
      url,
    ],
    { timeoutMs: METADATA_TIMEOUT_MS },
  );

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (error) {
    throw new ExtractionError("Could not read that video's details.", { cause: error });
  }

  return mapMetadata(payload, { hasFfmpeg: Boolean(ffmpeg) });
};

let activeDownloads = 0;

/**
 * Streams the chosen format straight through this process. Nothing is written
 * to disk, which matters on hosts with small quotas.
 */
export const createDownloadStream = async (url, formatId) => {
  if (!FORMAT_ID_PATTERN.test(formatId)) {
    const error = new Error("Unknown format");
    error.status = 400;
    throw error;
  }

  const { ytDlp } = await probeTools();
  if (!ytDlp) {
    throw new ToolUnavailableError(
      "The download service is not configured on this server yet.",
    );
  }

  if (activeDownloads >= MAX_CONCURRENT) {
    const error = new Error(
      "The server is handling its maximum number of downloads. Try again shortly.",
    );
    error.status = 503;
    throw error;
  }

  activeDownloads += 1;

  const child = spawn(
    YT_DLP_PATH,
    [
      "-f",
      formatId,
      "-o",
      "-",
      "--no-playlist",
      "--no-warnings",
      "--no-progress",
      "--socket-timeout",
      "15",
      ...extraArgs(),
      "--",
      url,
    ],
    { shell: false, windowsHide: true, env: spawnEnv() },
  );

  const release = () => {
    activeDownloads = Math.max(0, activeDownloads - 1);
  };

  child.on("close", release);
  child.on("error", release);

  return child;
};

export const errors = { ToolUnavailableError, ExtractionError };
export const _internals = { selectFormats, qualityLabel, summariseFailure, FORMAT_ID_PATTERN };
