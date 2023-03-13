const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./routes/api-router');
const {
  handle404NonExistantPaths,
  handlePSQL400s,
  handleCustomErrors,
  handleServerErrors,
} = require('./errors/error-handling');

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.use(handle404NonExistantPaths);
app.use(handlePSQL400s);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
