const express = require('express');
const app = express();
const {
  sendAvailableEndpoints,
} = require('./controllers/endpoints-controllers');
const { sendTopics, postTopic } = require('./controllers/topics-controllers');
const {
  sendArticles,
  sendArticleById,
  patchArticleVotes,
  postArticle,
  deleteArticle,
} = require('./controllers/articles-controllers');
const {
  postComment,
  sendCommentsByArticleId,
  deleteComment,
  patchCommentVotes,
} = require('./controllers/comments-controllers');
const {
  sendUsers,
  sendUserByUsername,
} = require('./controllers/users-controllers');
const {
  handle404NonExistantPaths,
  handlePSQL400s,
  handleCustomErrors,
  handleServerErrors,
} = require('./errors/error-handling');

app.use(express.json());

app.get('/api', sendAvailableEndpoints);
app.get('/api/topics', sendTopics);
app.post('/api/topics', postTopic);
app.get('/api/users', sendUsers);
app.get('/api/users/:username', sendUserByUsername);
app.get('/api/articles', sendArticles);
app.post('/api/articles', postArticle);
app.get('/api/articles/:article_id', sendArticleById);
app.delete('/api/articles/:article_id', deleteArticle);
app.get('/api/articles/:article_id/comments', sendCommentsByArticleId);
app.post('/api/articles/:article_id/comments', postComment);
app.patch('/api/articles/:article_id', patchArticleVotes);
app.delete('/api/comments/:comment_id', deleteComment);
app.patch('/api/comments/:comment_id', patchCommentVotes);

app.use(handle404NonExistantPaths);
app.use(handlePSQL400s);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
