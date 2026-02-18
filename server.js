import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import ApiResponse from "./src/utils/apiResponse.js";
import userRoutes from "./src/route/user.route.js";

// recuperer les variables d'environnement
dotenv.config();

// creation de l'application express
const app = express();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

//  AJOUT MINIMAL : config Mongo (Docker injecte MONGO_HOST=mongodb)
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_INIT_DB = process.env.MONGO_INIT_DB;
const MONGO_HOST = process.env.MONGO_HOST || "localhost";

const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_INIT_DB}?authSource=admin`;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
// middleware pour logger les requetes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// ajouter une ou des routes pour tester le serveur
app.get("/", (req, res) => {
  ApiResponse.success(res, null, "Welcome to the API");
});

//  AJOUT MINIMAL : connexion Mongo + start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  });

app.use((req, res) => {
  ApiResponse.notFound(res, "Route not found");
});

//  ton middleware d'erreur doit avoir
app.use((err, req, res, next) => {
  console.error(err.stack);
  ApiResponse.error(res, "Internal Server Error");
});

// reaction au changement d'etat en fonctionnement
process.on("SIGINT", async () => {
  console.log("Server is shutting down...");
  try {
    await mongoose.connection.close();
  } catch (e) {}
  process.exit(0);
});
