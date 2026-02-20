import MovieRepository from "../repository/movie.repository.js";

class MovieService {
  static async getAllMovies(filters = {}, pagination = {}) {
    const [items, total] = await Promise.all([
      MovieRepository.findAll(filters, pagination),
      MovieRepository.count(filters),
    ]);

    const page = Number(pagination.page || 1);
    const limit = Number(pagination.limit || 20);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async getMovieById(id) {
    const movie = await MovieRepository.findById(id);
    if (!movie) throw new Error("Movie not found");
    return movie;
  }

  static async searchMovies(search, pagination = {}) {
    if (!search || search.trim().length < 2) {
      throw new Error("Le paramètre search est requis (min 2 caractères)");
    }
    return await MovieRepository.search(search.trim(), pagination);
  }

  static async getMovieByShowId(show_id) {
    const movie = await MovieRepository.findByShowId(show_id);
    if (!movie) throw new Error("Movie not found");
    return movie;
  }
  static async createMovie(payload) {
  return await MovieRepository.create(payload);

    }

    static async updateMovie(id, payload) {
    const updated = await MovieRepository.updateById(id, payload);
    if (!updated) {
        const err = new Error("Movie not found");
        err.statusCode = 404;
        throw err;
    }
    return updated;
    }

    static async deleteMovie(id) {
    const deleted = await MovieRepository.deleteById(id);
    if (!deleted) {
        const err = new Error("Movie not found");
        err.statusCode = 404;
        throw err;
    }
    return deleted;
    }
}

export default MovieService;