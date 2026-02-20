import MovieModel from "../model/movie.model.js";

class MovieRepository {
  static async findAll(filters = {}, pagination = {}) {
    const query = this.buildQuery(filters);

    const page = Number(pagination.page || 1);
    const limit = Number(pagination.limit || 20);
    const skip = (page - 1) * limit;

    return await MovieModel.find(query)
      .sort({ release_year: -1, title: 1 })
      .skip(skip)
      .limit(limit);
  }

  static async count(filters = {}) {
    const query = this.buildQuery(filters);
    return await MovieModel.countDocuments(query);
  }

  static async findById(id) {
    return await MovieModel.findById(id);
  }

  static async findByShowId(show_id) {
    return await MovieModel.findOne({ show_id }); 
  }

  static async create(movieData) {
  return await MovieModel.create(movieData);
}

static async updateById(id, updateData) {
  return await MovieModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
}

static async deleteById(id) {
  return await MovieModel.findByIdAndDelete(id);
}

  // Recherche simple (regex) sur plusieurs champs
  static async search(search, pagination = {}) {
    const page = Number(pagination.page || 1);
    const limit = Number(pagination.limit || 20);
    const skip = (page - 1) * limit;

    const q = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { director: { $regex: search, $options: "i" } },
        { cast: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };

    return await MovieModel.find(q)
      .sort({ release_year: -1 })
      .skip(skip)
      .limit(limit);
  }

  // BuildQuery comme UserRepository :contentReference[oaicite:3]{index=3}
  static buildQuery(filters) {
    const query = {};

    if (filters.year) query.release_year = Number(filters.year);
    if (filters.rating) query.rating = filters.rating;
    if (filters.duration) query.duration = filters.duration; // ex: "90 min"

    if (filters.category) {
      query.listed_in = { $regex: filters.category, $options: "i" };
    }

    // prix min/max
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) query.price.$gte = Number(filters.minPrice);
      if (filters.maxPrice !== undefined) query.price.$lte = Number(filters.maxPrice);
    }

    // filtre pays
    if (filters.country) {
      query.country = { $regex: filters.country, $options: "i" };
    }

    return query;
  }
}

export default MovieRepository;