const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index")


beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});


describe("GET /api/topics", () => {
  it("200: responds with an array of all the topic objects containing the properties: slug and description", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body}) => {
      const { topics } = body;

      expect(topics).toHaveLength(3);

      topics.forEach((topic) => {
        expect(topic).toHaveProperty("description", expect.any(String));
        expect(topic).toHaveProperty("slug", expect.any(String));
      });
    });
  });
});


// describe("GET /api/non-existent-route", () => {
//   it("404: as route does not exist - responds with 'Not found'", () => {
//     return request(app)
//     .get("/api/non-existent-route")
//     .expect(404)
//     .then(({body}) => {
//       expect(body.msg).toBe('Not found');
//       });
//   });
// });



