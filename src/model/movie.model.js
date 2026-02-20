import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    show_id: { type: String, trim: true, index: true },
    title: { type: String, required: [true, "Le titre est requis"], trim: true, index: true },

    director: { type: String, trim: true, default: "" },
    cast: { type: String, trim: true, default: "" },
    country: { type: String, trim: true, default: "" },

    release_year: { type: Number, min: [1900, "Année invalide"] },
    rating: { type: String, trim: true, default: "" },
    duration: { type: String, trim: true, default: "" },

    listed_in: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },

    price: { type: Number, required: [true, "Le prix est requis"], min: [0, "Prix invalide"] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index utiles pour recherche
movieSchema.index({ title: 1, release_year: -1 });
movieSchema.index({ listed_in: 1 });

// 
const MovieModel = mongoose.model("MovieModel", movieSchema, "movies");
export default MovieModel;