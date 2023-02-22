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

module.exports = { fetchArticles, fetchArticleById };
