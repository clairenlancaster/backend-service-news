const { fetchTopics, addTopic } = require('../models/topics-models');

sendTopics = (request, response, next) => {
  fetchTopics()
    .then((topics) => response.status(200).send({ topics }))
    .catch((error) => {
      next(error);
    });
};

postTopic = (request, response, next) => {
  const newTopic = request.body;

  addTopic(newTopic)
    .then((topic) => {
      response.status(201).send({ topic });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { sendTopics, postTopic };
