const moviesRouter = require('express').Router();
const {
  createMovieValidation,
  movieIdValidation,
} = require('../middlewares/validation');
const {
  createMovie,
  getMovies,
  deleteMovie,
  //addLike,
  //deleteLike,
} = require('../controllers/movies');

moviesRouter.post('/', createMovieValidation, createMovie);
moviesRouter.get('/', getMovies);
moviesRouter.delete('/:movieId', movieIdValidation, deleteMovie);
//moviesRouter.put('/:movieId/likes', movieIdValidation, addLike);
//moviesRouter.delete('/:movieId/likes', movieIdValidation, deleteLike);

module.exports = moviesRouter;
