const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequestError = require('../errors/BadRequestError');

const urlValidation = (url) => {
  if (isUrl(url)) return url;
  throw new BadRequestError('Некорректный URL');
};

const idValidation = (id) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  if (regex.test(id)) return id;
  throw new BadRequestError('Некорректный id');
};

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
    // about: Joi.string().min(2).max(30),
    // avatar: Joi.string().custom(urlValidation),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
});

// const getUserByIdValidation = celebrate({
//  params: Joi.object().keys({
//    userId: Joi.string().required().custom(idValidation),
//  }),
// });

// const updateAvatarValidation = celebrate({
//  body: Joi.object().keys({
//    avatar: Joi.string().required().custom(urlValidation),
//  }),
// });

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMoviesValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidation),
    trailerLink: Joi.string().required().custom(urlValidation),
    thumbnail: Joi.string().required().custom(urlValidation),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const moviesIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom(idValidation),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  // getUserByIdValidation,
  // updateAvatarValidation,
  updateProfileValidation,
  createMoviesValidation,
  moviesIdValidation,
};
