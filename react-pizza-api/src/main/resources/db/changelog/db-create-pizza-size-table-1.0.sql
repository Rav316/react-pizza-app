--liquibase formatted sql

--changeset alex:1

CREATE TABLE pizza_size
(
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY ,
    value smallint NOT NULL UNIQUE
);