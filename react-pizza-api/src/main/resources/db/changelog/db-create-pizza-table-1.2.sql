--liquibase formatted sql

--changeset alex:1

ALTER TABLE pizza
ALTER COLUMN category_id
DROP NOT NULL ;