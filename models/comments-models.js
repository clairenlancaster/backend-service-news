const db = require("../db/connection.js");

fetchCommentsByArticleId = (article_id) => {
  const queryString = `SELECT * FROM comments
  WHERE article_id = $1`;

  return db.query(queryString, [article_id]).then((result) => {
    return result.rows;
  });
};

addComment = (newComment, article_id) => {
  const { author, body, created_at} = newComment;

  if (!author || !body) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  }

  return db
    .query(
      `
    INSERT INTO comments
      (author, body, article_id)
    VALUES
      ($1, $2, $3)
    RETURNING *
    `,
      [author, body, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = { fetchCommentsByArticleId, addComment };
