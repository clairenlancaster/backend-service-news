const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("app", () => {
  describe("server errors", () => {
    it("404: responds with a message 'Path not found' when sent a valid but non-existant path", () => {
      return request(app)
        .get("/not-an-existing-path")
        .expect(404)
        .then(({ body }) => {
          const serverResponseMessage = body.msg;
          expect(serverResponseMessage).toBe("Path not found");
        });
    });
  });

  describe("GET /api/topics", () => {
    it("200: responds with an array of all the topic objects containing the properties: slug and description", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;

          expect(topics).toHaveLength(3);

          topics.forEach((topic) => {
            expect(topic).toHaveProperty("description", expect.any(String));
            expect(topic).toHaveProperty("slug", expect.any(String));
          });
        });
    });
  });

  describe("GET /api/articles", () => {
    it("200: responds with an array of all the article objects containing the properties: author, title, article_id, topic, created_at, votes, article_img_url, comment_count", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;

          expect(articles).toHaveLength(12);

          articles.forEach((article) => {
            expect(article).toHaveProperty("author", expect.any(String));
            expect(article).toHaveProperty("title", expect.any(String));
            expect(article).toHaveProperty("article_id", expect.any(Number));
            expect(article).toHaveProperty("topic", expect.any(String));
            expect(article).toHaveProperty("created_at", expect.any(String));
            expect(article).toHaveProperty("votes", expect.any(Number));
            expect(article).toHaveProperty(
              "article_img_url",
              expect.any(String)
            );
            expect(article).toHaveProperty("comment_count", expect.any(Number));
          });
        });
    });
    it("200: responds with an array of all the article objects which contains a comment_count property which is the total count of all the comments with this article_id ", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;

          expect(articles).toHaveLength(12);

          articles.forEach((article) => {
            expect(article).toHaveProperty("comment_count", expect.any(Number));
          });

          const mostCommentedArticle = articles.find(
            (article) => article.article_id === 1
          );
          expect(mostCommentedArticle.comment_count).toBe(11);
        });
    });
    it("200: responds with an array of article objects sorted by date of creation in descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;

          expect(articles).toHaveLength(12);

          const articlesCopy = [...articles];
          const dateOrderedArticles = articlesCopy.sort(
            (articleA, articleB) => {
              return articleB.created_at - articleA.created_at;
            }
          );
          expect(articles).toEqual(dateOrderedArticles);
        });
    });
  });

  describe("GET /api/articles/:article_id", () => {
    it("200: returns an article object with the properties: author, title, article_id, body, topic, created_at, votes and article_img_url", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(typeof articles).toBe("object");

          expect(articles).toHaveProperty("author", expect.any(String));
          expect(articles).toHaveProperty("title", expect.any(String));
          expect(articles).toHaveProperty("article_id", expect.any(Number));
          expect(articles).toHaveProperty("topic", expect.any(String));
          expect(articles).toHaveProperty("created_at", expect.any(String));
          expect(articles).toHaveProperty("votes", expect.any(Number));
          expect(articles).toHaveProperty(
            "article_img_url",
            expect.any(String)
          );

          expect(articles.author).toBe("butter_bridge");
          expect(articles.title).toBe("Living in the shadow of a great man");
          expect(articles.votes).toBe(100);
        });
    });
    it("400: responds with a message of 'Bad request' when sent an invalid article_id", () => {
      return request(app)
        .get("/api/articles/invalid-article-id")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    it("404: responds with a message of 'Article not found' when sent a query for a valid but non-existent article_id", () => {
      return request(app)
        .get("/api/articles/25")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article not found");
        });
    });
  });

  describe("GET /api/articles/:article_id/comments", () => {
    it("200: returns an array of comments for the given article_id - each comment should have the properties: comment_id, votes, created_at, author, body and article_id", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;

          expect(comments).toHaveLength(11);

          comments.forEach((comment) => {
            expect(comment).toHaveProperty("comment_id", expect.any(Number));
            expect(comment).toHaveProperty("votes", expect.any(Number));
            expect(comment).toHaveProperty("created_at", expect.any(String));
            expect(comment).toHaveProperty("author", expect.any(String));
            expect(comment).toHaveProperty("body", expect.any(String));
            expect(comment).toHaveProperty("article_id", expect.any(Number));
          });
        });
    });
    it("200: returns an empty array of comments when sent a query for an article_id that exists but has no comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toHaveLength(0);
        });
    });
    it("400: responds with a message of 'Bad request' when sent a query for comments linked to an invalid article_id", () => {
      return request(app)
        .get("/api/articles/invalid-article-id/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    it("404: responds with a message of 'article_id not found' when sent a query for comments linked to a valid but non-existent article_id", () => {
      return request(app)
        .get("/api/articles/25/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article not found");
        });
    });
  });

  describe("POST /api/articles/:article_id/comments", () => {
    it("201: responds with the posted comment when passed an object with the essential properties: author (username) and body", () => {
      const newComment = {
        author: "butter_bridge",
        body: "testBody",
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
          const { comment } = body;
          expect(comment.author).toBe("butter_bridge");
          expect(comment.body).toBe("testBody");
          expect(comment.article_id).toBe(1);
        });
    });
    it("201: responds with the posted comment and ignores the non-essential properties in the object: created_at and votes", () => {
      const newComment = {
        author: "butter_bridge",
        body: "testBody",
        created_at: 1583025180000,
        votes: 5
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
          const { comment } = body;
          expect(comment.votes).toBe(0);

          expect(comment.author).toBe("butter_bridge");
          expect(comment.body).toBe("testBody");
          expect(comment.article_id).toBe(1);
        });
    });
    it("400: responds with a message of 'Bad request' when sent a post request without a body", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .expect(400)
        .then((response) => {
          const msg = response.body.msg;
          expect(msg).toBe("Bad request");
        });
    });
    it("400: responds with a message of 'Bad request' when sent a post request for an invalid article_id", () => {
      const newComment = {
        author: "butter_bridge",
        body: "testBody",
      };
      return request(app)
        .post("/api/articles/invalid-article/comments")
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    it("404: responds with a message of 'Article_id not found' when sent a post request for an article_id that is valid but non-existent - cannot attach comment to a non-existent article", () => {
      const newComment = {
        author: "butter_bridge",
        body: "testBody",
      };
      return request(app)
        .post("/api/articles/25/comments")
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article_id not found");
        });
    });
    it("404: responds with a message of 'User not found' when sent a post request with a username that is not valid - user does not exist on users' table", () => {
      const newComment = {
        author: "non-existent-user",
        body: "testBody",
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("User not found");
        });
    });
  });

  describe("GET  /api/users", () => {
    it("200: responds with an array of all the users objects containing the properties: username, name and avatar_url", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const { users } = body;

          expect(users).toHaveLength(4);

          users.forEach((user) => {
            expect(user).toHaveProperty("username", expect.any(String));
            expect(user).toHaveProperty("name", expect.any(String));
            expect(user).toHaveProperty("avatar_url", expect.any(String));
          });

          expect(users[0]).toEqual({
            username: "butter_bridge",
            name: "jonny",
            avatar_url: "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
          });
        });
    });
  });
});
