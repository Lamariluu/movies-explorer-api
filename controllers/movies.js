const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
//const NotFoundError = require('../errors/NotFoundError');

const {
  handleError,
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(HTTP_STATUS_OK).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { name, link } = req.body;
  Movie.create({ name, link, owner: req.user._id })
    .then((movie) => res.status(HTTP_STATUS_CREATED).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      const ownerId = movie.owner.toString();
      if (ownerId !== userId) {
        // попытка удаления чужого фильма
        throw new ForbiddenError('Нет прав для удаления фильма');
      }
      return movie;
    })
    // удаление фильма
    .then((movie) => Movie.deleteOne(movie))
    .then((movie) => res.status(HTTP_STATUS_OK).send(movie))
    .catch((err) => handleError(err, next));
};

//const addLike = (req, res, next) => {
//  Movie.findByIdAndUpdate(
//    req.params.movieId,
//    { $addToSet: { likes: req.user._id } },
//    { new: true },
//  )
//    .then((movie) => {
//      if (!movie) {
//        return next(new NotFoundError('Некорректный id'));
//      } return res.status(HTTP_STATUS_OK).send(movie);
//    })
//    .catch((err) => handleError(err, next));
//};

//const deleteLike = (req, res, next) => {
//  Movie.findByIdAndUpdate(
//    req.params.movieId,
//    { $pull: { likes: req.user._id } },
//    { new: true },
//  )
//    .then((movie) => {
//      if (!movie) {
//        return next(new NotFoundError('Некорректный id'));
//      } return res.status(HTTP_STATUS_OK).send(movie);
//    })
//    .catch((err) => handleError(err, next));
//};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
  //addLike,
  //deleteLike,
};
