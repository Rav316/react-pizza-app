--liquibase formatted sql

--changeset alex:1
UPDATE pizza
SET rating = floor(random() * 10) + 1;