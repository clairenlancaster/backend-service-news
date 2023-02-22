const db = require("../db/connection.js");

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

module.exports = { addComment };
