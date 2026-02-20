import mongoose from "mongoose";

export default async function connectDB() {
  const MONGO_USER = process.env.MONGO_USER;
  const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
  const MONGO_PORT = process.env.MONGO_PORT || 27017;
  const MONGO_INIT_DB = process.env.MONGO_INIT_DB;
  const MONGO_HOST = process.env.MONGO_HOST || "localhost";

  const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_INIT_DB}?authSource=admin`;

  try {
    await mongoose.connect(MONGO_URI);
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  }
}
