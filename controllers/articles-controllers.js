const {
  fetchArticles,
  fetchArticleById,
  updateArticleVotes,
} = require("../models/articles-models");

sendArticles = (request, response, next) => {
  const { topic, sort_by, order } = request.query;
  // console.log(sort_by);

  fetchArticles(topic, sort_by, order)
    .then((articles) => response.status(200).send({ articles }))
    .catch((error) => {
      next(error);
    });
};

sendArticleById = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticleById(article_id)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((error) => {
      next(error);
    });
};

patchArticleVotes = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;

  updateArticleVotes(article_id, inc_votes)
    .then((updatedArticle) => {
      response.status(200).send({ updatedArticle });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { sendArticles, sendArticleById, patchArticleVotes };
