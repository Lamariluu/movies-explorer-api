const moviesRouter = require('express').Router();
const {
  createMoviesValidation,
  moviesIdValidation,
} = require('../middlewares/validation');
const {
  createMovie,
  getMovies,
  deleteMovie,
  // addLike,
  // deleteLike,
} = require('../controllers/movies');

moviesRouter.post('/', createMoviesValidation, createMovie);
moviesRouter.get('/', getMovies);
moviesRouter.delete('/:movieId', moviesIdValidation, deleteMovie);
// moviesRouter.put('/:movieId/likes', moviesIdValidation, addLike);
// moviesRouter.delete('/:movieId/likes', moviesIdValidation, deleteLike);

module.exports = moviesRouter;
