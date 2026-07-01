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
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default mongoose;
