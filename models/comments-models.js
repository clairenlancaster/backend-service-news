const db = require("../db/connection.js");

fetchCommentsByArticleId = (article_id) => {
  const queryString = `SELECT * FROM comments
  WHERE article_id = $1`;

  return db.query(queryString, [article_id]).then((result) => {
    return result.rows;
  });
};

module.exports = { fetchCommentsByArticleId };
