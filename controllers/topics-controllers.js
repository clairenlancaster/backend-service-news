const {fetchTopics} = require("../models/topics-models")

sendTopics = (request, response, next) => { 
  fetchTopics()
  .then((topics) => response.status(200).send({topics}))
  .catch((error) => {
    next(error);
  });
}

module.exports = {sendTopics}; 