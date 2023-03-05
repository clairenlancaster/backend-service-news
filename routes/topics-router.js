const topicsRouter = require('express').Router();
const { sendTopics, postTopic } = require('../controllers/topics-controllers');

topicsRouter.get('/', sendTopics);
topicsRouter.post('/', postTopic);

module.exports = topicsRouter;