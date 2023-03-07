const {
  fetchArticles,
  fetchArticleById,
  updateArticleVotes,
  addArticle,
  removeArticle,
} = require('../models/articles-models');

const { removeCommentsByArticleId } = require('../models/comments-models');

sendArticles = (request, response, next) => {
  const { topic, sort_by, order, limit, p} = request.query; 

    fetchArticles(topic, sort_by, order, limit, p)
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

postArticle = (request, response, next) => {
  const newArticle = request.body;

  addArticle(newArticle)
    .then((article) => {
      return fetchArticleById(article.article_id);
    })
    .then((article) => {
      response.status(201).send({ article });
    })
    .catch((error) => {
      next(error);
    });
};

deleteArticle = (request, response, next) => {
  const { article_id } = request.params;

  Promise.all([
    removeCommentsByArticleId(article_id),
    removeArticle(article_id),
  ])
    .then(() => {
      response.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  sendArticles,
  sendArticleById,
  patchArticleVotes,
  postArticle,
  deleteArticle,
};
