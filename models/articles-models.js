const db = require("../db/connection.js");

fetchArticles = (topic, sort_by, order) => {
  const validTopicByOptions = ["mitch", "cats", "paper"];
  const parsedTopic = parseInt(topic);
  if (topic && !Number.isNaN(parsedTopic)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  } else if (topic && !validTopicByOptions.includes(topic)) {
    return Promise.reject({
      status: 404,
      msg: "Not found",
    });
  }

  const validSortByOptions = [
    "author",
    "title",
    "article_id",
    "votes",
    "comment_count",
  ];
  const parsedSortBy = parseInt(sort_by);
  if (sort_by && !Number.isNaN(parsedSortBy)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  } else if (sort_by && !validSortByOptions.includes(sort_by)) {
    return Promise.reject({
      status: 404,
      msg: "Not able to sort",
    });
  }

  const validOrderByOptions = ["ascending", "descending"];
  const parsedOrder = parseInt(order);
  if (order && !Number.isNaN(parsedOrder)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  } else if (order && !validOrderByOptions.includes(order)) {
    return Promise.reject({
      status: 404,
      msg: "Not able to order",
    });
  }

  let queryString = `
  SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments.article_id) AS int) AS comment_count
  FROM articles
  LEFT JOIN comments
  ON comments.article_id = articles.article_id
  `;

  if (topic) {
    queryString += `
  WHERE articles.topic = '${topic}'
  `;
  }
  queryString += `
  GROUP BY articles.article_id
  `;

  let orderArticlesBy = "DESC";

  if (order === "descending") {
    orderArticlesBy = "DESC";
  } else if (order === "ascending") {
    orderArticlesBy = "ASC";
  }

  if (sort_by) {
    queryString += `ORDER BY ${sort_by} ${orderArticlesBy}`;
  } else {
    queryString += `ORDER BY created_at ${orderArticlesBy}`;
  }

  return db.query(queryString).then((result) => {
    const articles = result.rows;
    return articles;
  });
};

fetchArticleById = (article_id) => {
  return db
    .query(
      `
  SELECT articles.author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, articles.article_img_url
  FROM articles 
  WHERE article_id = $1
  `,
      [article_id]
    )
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return result.rows[0];
    });
};

updateArticleVotes = (article_id, inc_votes) => {
  if (!inc_votes) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  }

  return db
    .query(
      `
      UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *
    `,
      [inc_votes, article_id]
    )
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return result.rows[0];
    });
};

module.exports = { fetchArticles, fetchArticleById, updateArticleVotes };
