DROP DATABASE IF EXISTS nc_news_test;
CREATE DATABASE nc_news_test;

\c nc_news_test

CREATE TABLE topics (
  slug VARCHAR PRIMARY KEY,
  description VARCHAR
);


CREATE TABLE users (
  username VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  avatar_url VARCHAR
);


CREATE TABLE articles (
  article_id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  topic VARCHAR NOT NULL REFERENCES topics(slug),
  author VARCHAR NOT NULL REFERENCES users(username),
  body VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  votes INT DEFAULT 0 NOT NULL,
  article_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700'
);


CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  body VARCHAR NOT NULL,
  article_id INT REFERENCES articles(article_id) NOT NULL,
  author VARCHAR REFERENCES users(username) NOT NULL,
  votes INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);


INSERT INTO topics 
  (slug, description) 
VALUES
  ('mitch', 'The man, the Mitch, the legend'),
  ('cats', 'Not dogs'),
  ('paper', 'what books are made of');



INSERT INTO users 
  (username, name, avatar_url) 
VALUES
  ('butter_bridge','jonny', 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'),
  ('icellusedkars','sam', 'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4'),
  ('rogersop','paul', 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4'),
  ('lurker','do_nothing', 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png');



INSERT INTO articles 
  (title, topic, author, body, created_at, votes, article_img_url) 
VALUES 
  ('Living in the shadow of a great man', 'mitch', 'butter_bridge', 'I find this existence challenging', '2020-02-29 11:12:00', 100,'https://images.pexels.com/photos/158651'),
  ('Eight pug gifs that remind me of mitch', 'mitch', 'icellusedkars', 'some gifs', '2020-02-29 11:12:00', 0, 'https://images.pexels.com/photos/158651'),
  ('UNCOVERED: catspiracy to bring down democracy', 'cats', 'rogersop', 'Bastet walks amongst us, and the cats are taking arms!', '2020-02-29 11:12:00', 0, 'https://images.pexels.com/photos/158651');
  


INSERT INTO comments 
  (body, author, article_id, votes, created_at) 
VALUES
  ("Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!", "butter_bridge", 9, 16, '2020-02-29 11:12:00'),
  ("The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.", "butter_bridge", 1, 14, '2020-02-29 11:12:00'),
  ("Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.", "icellusedkars", 1, 100,'2020-02-29 11:12:00');

SELECT * FROM topics;
SELECT * FROM users;
SELECT * FROM articles;
-- SELECT * FROM comments;