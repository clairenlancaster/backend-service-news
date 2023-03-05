const endpointsRouter = require('express').Router();
const {
  sendAvailableEndpoints,
} = require('../controllers/endpoints-controllers');

endpointsRouter.get('', sendAvailableEndpoints);

module.exports = endpointsRouter;