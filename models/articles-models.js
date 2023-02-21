const db = require("../db/connection.js");

fetchArticles = () => {
  const queryString = `
  SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments.article_id) AS int) AS comment_count
  FROM articles
  LEFT JOIN comments
  ON comments.article_id = articles.article_id
  GROUP BY articles.article_id
  ORDER BY articles.created_at DESC
  `;

  return db.query(queryString).then((result) => {
    const articles = result.rows;
    return articles;
  });
};

module.exports = { fetchArticles };
