create database changecase

CREATE TABLE USERS
(
  id serial primary key,
  name character varying(250)
);

CREATE TABLE SAVEDWORDS
(
  word text,
  u_id integer references users(id)
);
