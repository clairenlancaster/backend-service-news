const { fetchCommentsByArticleId } = require("../models/comments-models");
const { fetchArticleById } = require("../models/articles-models");

sendCommentsByArticleId = (request, response, next) => {
  const { article_id } = request.params;

  const articleCheck = fetchArticleById(article_id);
  const fetchComments = fetchCommentsByArticleId(article_id);

  Promise.all([fetchComments, articleCheck])
    .then((result) => {
      const comments = result[0];
      response.status(200).send({ comments });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { sendCommentsByArticleId };
