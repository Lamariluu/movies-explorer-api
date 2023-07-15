const usersRouter = require('express').Router();

const {
  getUser,
  //getCurrentUser,
  //getUserById,
  //updateAvatar,
  updateProfile,
} = require('../controllers/users');

const { updateProfileValidation } = require('../middlewares/validation');

usersRouter.get('/me', getUser);
//usersRouter.get('/me', getCurrentUser);
//usersRouter.get('/:userId', getUserByIdValidation, getUserById);
//usersRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);
usersRouter.patch('/me', updateProfileValidation, updateProfile);

module.exports = usersRouter;
