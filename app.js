const express = require("express");
const app = express();
const { sendTopics } = require("./controllers/topics-controllers");
const { sendArticles } = require("./controllers/articles-controllers");
const {
  handle404NonExistantPaths,
  handleServerErrors,
} = require("./errors/error-handling");

app.get("/api/topics", sendTopics);
app.get("/api/articles", sendArticles);

app.use(handle404NonExistantPaths);

app.use(handleServerErrors);

module.exports = app;
