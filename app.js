const express = require("express");
const app = express();
const { sendTopics } = require("./controllers/topics-controllers");
const { handleServerErrors } = require("./errors/error-handling");


app.get("/api/topics", sendTopics);


app.use(handleServerErrors);

module.exports = app;