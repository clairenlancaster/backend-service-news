const db = require("../db/connection.js");

fetchUsers = () => {
  const queryString = `SELECT * FROM users`;

  return db.query(queryString).then((result) => {
    return result.rows;
  });
};

module.exports = { fetchUsers };
