DROP DATABASE IF EXISTS  capstone;
CREATE DATABASE capstone;

\c users_db
DROP TABLE IF EXISTS users;
CREATE TABLE users
(
  users_id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  username VARCHAR(20) NOT NULL UNIQUE,
  pw TEXT NOT NULL,
  email VARCHAR (50) UNIQUE NOT NULL
);
INSERT INTO users
  (first_name, last_name, username, pw, email)
VALUES
  ('bob', 'bob', 'bob', 'bobbob','bob@bob.com');

DROP TABLE IF EXISTS favorites;
CREATE TABLE favorites
(
  favorite_users_id SERIAL UNIQUE,
  favorites_id TEXT NOT NULL,
  users_id INT NOT NULL,
  PRIMARY KEY(favorite_users_id),
  CONSTRAINT fk_user
    FOREIGN KEY(users_id)
      REFERENCES users(users_id)
 );