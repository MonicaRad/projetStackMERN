import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import ApiResponse from "./src/utils/apiResponse.js";

// recuperer les variables d'environnement
dotenv.config();

// creation de l'application express
const app = express();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware pour logger les requetes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// ajouter une ou des routes pour tester le serveur
app.get("/", (req, res) => {
  ApiResponse.success(res, null, "Welcome to the API");
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

app.use((req, res) => {
  ApiResponse.notFound(res, "Route not found");
});

app.use((err, req, res) => {
  console.error(err.stack);
  ApiResponse.error(res, "Internal Server Error");
});

// reaction au changement d'etat en fonctionnement
// gestion propre de l'arret du serveur => reagir en conseauence de l'arret du serveur ex : fermer les connexions a la base de donnees, fermer les connexions aux clients, etc...
process.on("SIGINT", () => {
  console.log("Server is shutting down...");
  process.exit(0);
});
