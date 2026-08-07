import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const localMongoUri = "mongodb://localhost:27017/downloadanyvideo";
const MONGODB_URI = process.env.MONGODB_URI || localMongoUri;

const getSafeMongoHost = (uri) => {
  try {
    const parsed = new URL(uri);
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
  } catch {
    return "configured MongoDB host";
  }
};

export const connectDB = async () => {
  try {
    if (isProduction && (!process.env.MONGODB_URI || MONGODB_URI === localMongoUri)) {
      throw new Error(
        "MONGODB_URI must be set to a remote MongoDB connection string in production"
      );
    }

    mongoose.set("strictQuery", true);

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: Number(process.env.MONGODB_MAX_POOL_SIZE || 10),
      dbName: process.env.MONGODB_DB_NAME || undefined,
    });

    console.log(`MongoDB connected: ${getSafeMongoHost(MONGODB_URI)}`);
  } catch (error) {
    // The database holds download analytics and contact messages. Every page,
    // and the downloader itself, works without it. Exiting here used to take
    // the whole site down over a storage dependency it does not need, and left
    // a bare 503 with the reason visible only in the runtime log.
    //
    // Stay up, say so loudly, and let /api/health report the degradation —
    // it already answers 503 while the connection is down, so uptime checks
    // still see the problem.
    console.error("MongoDB connection error:", error.message);
    console.warn(
      "Serving without a database. Pages and downloads work; download " +
        "analytics and contact messages will not be stored until the " +
        "connection recovers.",
    );
  }
};

export default mongoose;
