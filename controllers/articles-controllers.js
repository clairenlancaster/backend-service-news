const { fetchArticles } = require("../models/articles-models");

sendArticles = (request, response, next) => {
  fetchArticles()
    .then((articles) => response.status(200).send({ articles }))
    .catch((error) => {
      next(error);
    });
};

module.exports = { sendArticles };
