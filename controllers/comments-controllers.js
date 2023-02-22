const { addComment } = require("../models/comments-models");

postComment = (request, response) => {
  const newComment = request.body;

  addComment(newComment)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { postComment };
