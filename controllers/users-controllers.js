const { fetchUsers, fetchUserByUsername } = require('../models/users-models');

sendUsers = (request, response, next) => {
  fetchUsers()
    .then((users) => response.status(200).send({ users }))
    .catch((error) => {
      next(error);
    });
};

sendUserByUsername = (request, response, next) => {
  const { username } = request.params;
  fetchUserByUsername(username)
    .then((users) => response.status(200).send({ users }))
    .catch((error) => {
      next(error);
    });
};

module.exports = { sendUsers, sendUserByUsername };
