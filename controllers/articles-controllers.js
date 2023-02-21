const {
  fetchArticles,
  fetchArticleById,
} = require("../models/articles-models");

sendArticles = (request, response, next) => {
  fetchArticles()
    .then((articles) => response.status(200).send({ articles }))
    .catch((error) => {
      next(error);
    });
};

sendArticleById = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticleById(article_id)
    .then((articles) => {
      response.status(200).send({ articles })
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { sendArticles, sendArticleById };
