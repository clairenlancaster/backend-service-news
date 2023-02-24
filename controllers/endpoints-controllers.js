const { fetchAvailableEndpoints } = require("../models/endpoints-models");

sendAvailableEndpoints = (request, response, next) => {
  fetchAvailableEndpoints()
    .then((endpoints) => {
      response.status(200).send({ endpoints });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { sendAvailableEndpoints };
