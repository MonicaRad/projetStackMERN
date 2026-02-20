import ApiResponse from '../utils/apiResponse.js';

const errorHandler = (err, req, res, next) => {
  console.error(' Erreur:', err.stack);

  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return ApiResponse.badRequest(res, 'Erreur de validation', errors);
  }

  // Erreur CastError (ID MongoDB invalide)
  if (err.name === 'CastError') {
    return ApiResponse.badRequest(res, 'ID invalide');
  }

  // Erreur de duplication (clé unique)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return ApiResponse.badRequest(res, `${field} existe déjà`);
  }

  // Erreur par défaut
  return ApiResponse.error(res, err.message || 'Erreur serveur interne', 500);
};

export default errorHandler;