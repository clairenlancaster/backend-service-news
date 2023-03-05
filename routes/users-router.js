const usersRouter = require('express').Router();
const {
  sendUsers,
  sendUserByUsername,
} = require('../controllers/users-controllers');

usersRouter.get('/', sendUsers);
usersRouter.get('/:username', sendUserByUsername);

module.exports = usersRouter;