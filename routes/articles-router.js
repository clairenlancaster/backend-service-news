const articlesRouter = require('express').Router();
const {
  sendArticles,
  sendArticleById,
  patchArticleVotes,
  postArticle,
  deleteArticle,
} = require('../controllers/articles-controllers');
const {
  postComment,
  sendCommentsByArticleId,
} = require('../controllers/comments-controllers');

articlesRouter.get('/', sendArticles);
articlesRouter.post('/', postArticle);
articlesRouter.get('/:article_id', sendArticleById);
articlesRouter.delete('/:article_id', deleteArticle);
articlesRouter.get('/:article_id/comments', sendCommentsByArticleId);
articlesRouter.post('/:article_id/comments', postComment);
articlesRouter.patch('/:article_id', patchArticleVotes);

module.exports = articlesRouter;
