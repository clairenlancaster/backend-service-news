const express = require("express");
const app = express();
const { sendTopics } = require("./controllers/topics-controllers");
const {
  sendArticles,
  sendArticleById,
} = require("./controllers/articles-controllers");
const {
  handle404NonExistantPaths,
  handlePSQL400s,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors/error-handling");

app.get("/api/topics", sendTopics);
app.get("/api/articles", sendArticles);
app.get("/api/articles/:article_id", sendArticleById);

app.use(handle404NonExistantPaths);
app.use(handlePSQL400s);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
