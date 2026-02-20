import express from "express";
import MovieController from "../controller/movie.controller.js";

const movie_router = express.Router();

// GET http://localhost:5000/api/movies/routes
movie_router.get("/routes", (req, res) => {
  res.send("route de gestion des movies");
});

// ordre important : routes spécifiques avant routes génériques :contentReference[oaicite:5]{index=5}
movie_router.get("/search", MovieController.search);
movie_router.get("/show/:show_id", MovieController.getMovieByShowId);
movie_router.get("/:id", MovieController.getMovieById);
movie_router.get("/", MovieController.getAllMovies);
movie_router.post("/", MovieController.createMovie);
movie_router.put("/:id", MovieController.updateMovie);
movie_router.delete("/:id", MovieController.deleteMovie);

export default movie_router;
