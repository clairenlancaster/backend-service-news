const db = require('../db/connection.js');

fetchUsers = () => {
  const queryString = `SELECT * FROM users`;

  return db.query(queryString).then((result) => {
    return result.rows;
  });
};

fetchUserByUsername = (username) => {
  const queryString = `SELECT * FROM users
  WHERE username = $1`;

  return db.query(queryString, [username]).then((result) => {
    if (result.rowCount === 0) {
      return Promise.reject({ status: 400, msg: 'User not found' });
    }
    return result.rows[0];
  });
};

module.exports = { fetchUsers, fetchUserByUsername };
