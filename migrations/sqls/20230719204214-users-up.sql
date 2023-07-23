CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  firstname       VARCHAR(250) NOT NULL,
  lastname        VARCHAR(250) NOT NULL,
  username        VARCHAR(250) NOT NULL,
  password_digest VARCHAR(250) NOT NULL
);