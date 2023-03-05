const endpoints = require('../endpoints.json');

sendAvailableEndpoints = (request, response, next) => {
  response.status(200).send({ endpoints });
};

module.exports = { sendAvailableEndpoints };
