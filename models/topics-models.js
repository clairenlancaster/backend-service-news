const db = require('../db/connection.js');

fetchTopics = () => {
  const queryString = `SELECT * FROM topics`;

  return db.query(queryString).then((result) => {
    const topics = result.rows;
    return topics;
  });
};

addTopic = (newTopic) => {
  const { slug, description } = newTopic;

  if (!slug || !description) {
    return Promise.reject({
      status: 400,
      msg: 'Bad request',
    });
  }

  let queryString = `
    INSERT INTO topics
      (slug, description)
    VALUES
      ($1, $2)
    RETURNING *
  `;

  return db.query(queryString, [slug, description]).then(({ rows }) => {
    return rows[0];
  });
};

module.exports = { fetchTopics, addTopic };
