require('dotenv').config();ё
const express = require('express');ё
const cors = require('cors');ё
const helmet = require('helmet');ё
const mongoose = require('mongoose');ё
const rateLimit = require('express-rate-limit');ё
const { errors } = require('celebrate');ё
//const { createUserValidation, loginValidation } = require('./middlewares/validation');
//const auth = require('./middlewares/auth');
const router = require('./routes/router');ё
//const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');ё
const { handleErrors } = require('./middlewares/handleErrors');ё

const app = express();
const {
  //MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000, MONGO_URL
} = process.env;

app.use(cors());
app.use(express.json());
// app.use(auth);

app.use(requestLogger); // подключаем логгер запросов

//app.get('/crash-test', () => {
//  setTimeout(() => {
//    throw new Error('Сервер сейчас упадёт');
//  }, 0);
//});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(helmet());

//app.post('/signin', loginValidation, login);
//app.post('/signup', createUserValidation, createUser);
//app.use(auth);
app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(handleErrors);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });

app.listen(PORT, (err) => {
  // eslint-disable-next-line no-unused-expressions, no-console
  err ? console.log(err) : console.log(`App listening on ${PORT}`);
});
