create database changecase

CREATE TABLE USERS
(
  id serial primary key,
  name character varying(250),
  externalId character varying(50)
);

CREATE TABLE SAVEDWORDS
(
  word text,
  u_id integer references users(id)
);
