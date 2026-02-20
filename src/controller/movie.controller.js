import MovieService from "../service/movie.service.js";
import ApiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";

class MovieController {
  static async getAllMovies(req, res, next) {
    try {
      const filters = {
        year: req.query.year,
        rating: req.query.rating,
        duration: req.query.duration,
        category: req.query.category,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        country: req.query.country,
      };

      const pagination = {
        page: req.query.page,
        limit: req.query.limit,
      };

      const result = await MovieService.getAllMovies(filters, pagination);
      return ApiResponse.success(res, "Liste des films récupérée avec succès", result);
    } catch (error) {
      next(error);
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const movieId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return ApiResponse.badRequest(res, "ID invalide");
      }
      const movie = await MovieService.getMovieById(movieId);
      return ApiResponse.success(res, "Film récupéré avec succès", movie);
    } catch (error) {
      next(error);
    }
  }

  static async getMovieByShowId(req, res, next) {
    try {
      const show_id = req.params.show_id;
      const movie = await MovieService.getMovieByShowId(show_id);
      return ApiResponse.success(res, `Film ${show_id} récupéré avec succès`, movie);
    } catch (error) {
      next(error);
    }
  }

  static async search(req, res, next) {
    try {
      const pagination = { page: req.query.page, limit: req.query.limit };
      const movies = await MovieService.searchMovies(req.query.search, pagination);
      return ApiResponse.success(res, "Résultats de recherche", movies);
    } catch (error) {
      next(error);
    }
  }
  static async createMovie(req, res, next) {
  try {
    const movie = await MovieService.createMovie(req.body);
    return ApiResponse.created(res, movie, "Film créé avec succès");
  } catch (error) {
    next(error);
  }
}

static async updateMovie(req, res, next) {
  try {
    const movieId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return ApiResponse.badRequest(res, "ID invalide");
    }

    const movie = await MovieService.updateMovie(movieId, req.body);
    return ApiResponse.success(res, movie, "Film mis à jour avec succès");
  } catch (error) {
    next(error);
  }
}

static async deleteMovie(req, res, next) {
  try {
    const movieId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return ApiResponse.badRequest(res, "ID invalide");
    }

    const movie = await MovieService.deleteMovie(movieId);
    return ApiResponse.success(res, movie, "Film supprimé avec succès");
  } catch (error) {
    next(error);
  }
}
}

export default MovieController;