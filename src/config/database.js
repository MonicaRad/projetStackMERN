import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PORT = 27017,
      MONGO_INIT_DB,
      MONGO_HOST = "localhost",
    } = process.env;

    const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_INIT_DB}?authSource=admin`;

    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
