const { fetchUsers } = require("../models/users-models");

sendUsers = (request, response, next) => {
  fetchUsers()
    .then((users) => response.status(200).send({ users }))
    .catch((error) => {
      next(error);
    });
};

module.exports = { sendUsers };
