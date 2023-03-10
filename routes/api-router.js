const apiRouter = require('express').Router();
const endpointsRouter = require('./endpoints-router');
const usersRouter = require('./users-router')
const articlesRouter = require('./articles-router');
const commentsRouter = require('./comments-router');
const topicsRouter = require('./topics-router');

apiRouter.use('', endpointsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/topics', topicsRouter);

module.exports = apiRouter;