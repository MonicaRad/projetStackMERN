import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import ApiResponse from "./src/utils/apiResponse.js";
import userRoutes from "./src/route/user.route.js";
import connectDatabase from "./src/config/database.js";
import orderRoutes from "./src/route/order.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

app.get("/", (req, res) => {
  ApiResponse.success(res, null, "Welcome to the API");
});

// connexion DB puis lancement serveur
connectDatabase().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
});

app.use((req, res) => {
  ApiResponse.notFound(res, "Route not found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  ApiResponse.error(res, "Internal Server Error");
});

process.on("SIGINT", async () => {
  console.log("Server is shutting down...");
  await mongoose.connection.close();
  process.exit(0);
});
