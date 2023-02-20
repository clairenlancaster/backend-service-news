const db = require("../db/connection.js");

fetchTopics = () => {
  const queryString = `SELECT * FROM topics`;

  return db.query(queryString). then((result) => {
    const topics = result.rows;
    return topics;
  })
}

module.exports = {fetchTopics};