const db = require("../db/connection.js");

fetchCommentsByArticleId = (article_id) => {
  const queryString = `SELECT * FROM comments
  WHERE article_id = $1`;

  return db.query(queryString, [article_id]).then((result) => {
    return result.rows;
  });
};

addComment = (newComment) => {
  const { username, body } = newComment;

  return db
    .query(
      `
    INSERT INTO comments
      (username, body)
    VALUES
      ($1, $2)
    RETURNING *
    `,
      [username, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = { fetchCommentsByArticleId, addComment };
