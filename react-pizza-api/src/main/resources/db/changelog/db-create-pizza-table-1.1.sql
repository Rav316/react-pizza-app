--liquibase formatted sql

--changeset alex:1

ALTER TABLE pizza
RENAME COLUMN imageurl TO image_url;