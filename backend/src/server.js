import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import { connectDB } from "./config/database.js";
import { assertSecurityConfig } from "./utils/security.js";
import downloadRoutes from "./routes/download.js";
import healthRoutes from "./routes/health.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";
const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");
const frontendIndexPath = path.join(frontendDistPath, "index.html");
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Fail fast on a misconfigured deployment rather than serving traffic with
// weak defaults.
assertSecurityConfig();

app.disable("x-powered-by");

// Number of reverse proxies in front of the app. Trusting more hops than
// actually exist lets a client forge X-Forwarded-For, which would spoof both
// the rate-limit key and the logged IP. Set TRUST_PROXY=0 when the app is
// exposed directly.
const trustProxy = process.env.TRUST_PROXY ?? "1";
app.set("trust proxy", trustProxy === "0" ? false : Number(trustProxy) || 1);

// Third-party origins the page is allowed to load scripts from and talk to.
// Analytics and ads stay blocked unless they are explicitly switched on, so a
// stray tag cannot start exfiltrating page data.
const analyticsEnabled = process.env.ENABLE_ANALYTICS === "true";
const adsEnabled = process.env.ENABLE_ADS === "true";

const scriptSrc = [
  "'self'",
  ...(analyticsEnabled ? ["https://www.googletagmanager.com"] : []),
  ...(adsEnabled ? ["https://pagead2.googlesyndication.com"] : []),
];

const connectSrc = [
  "'self'",
  ...(analyticsEnabled
    ? ["https://www.google-analytics.com", "https://*.analytics.google.com"]
    : []),
];

const frameSrc = adsEnabled ? ["https://googleads.g.doubleclick.net"] : ["'none'"];

// Security Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc,
        // React sets inline style attributes, which requires unsafe-inline.
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "data:"],
        connectSrc,
        frameSrc,
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        ...(isProduction ? { upgradeInsecureRequests: [] } : {}),
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    frameguard: { action: "deny" },
  }),
);

app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );
  next();
});

// CORS Configuration
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    const error = new Error("Not allowed by CORS");
    error.status = 403;
    callback(error);
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

// Logging
app.use(morgan(isProduction ? "combined" : "dev"));

// Body Parser
app.use(express.json({ limit: "100kb", type: "application/json" }));
app.use(express.urlencoded({ limit: "100kb", extended: false }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX || 60),
  message: { error: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// Database Connection
connectDB();

// Routes
app.use("/api", downloadRoutes);
app.use("/api", healthRoutes);
app.use("/api", contactRoutes);

if (isProduction && existsSync(frontendIndexPath)) {
  app.use(express.static(frontendDistPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      next();
      return;
    }

    res.sendFile(frontendIndexPath);
  });
}

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack || err.message);
  res.status(err.status || 500).json({
    error:
      isProduction && !err.status
        ? "Internal Server Error"
        : err.message || "Internal Server Error",
  });
});

const server = app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received, shutting down`);
  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
