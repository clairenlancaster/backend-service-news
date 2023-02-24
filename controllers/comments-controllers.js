const {
  fetchCommentsByArticleId,
  addComment,
  removeComment,
} = require("../models/comments-models");
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

postComment = (request, response, next) => {
  const newComment = request.body;
  const { article_id } = request.params;

  addComment(newComment, article_id)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((error) => {
      next(error);
    });
};

deleteComment = (request, response, next) => {
  const { comment_id } = request.params;

  removeComment(comment_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { sendCommentsByArticleId, postComment, deleteComment };
