--liquibase formatted sql

--changeset alex:1
UPDATE pizza
SET category_id = 3
WHERE id = 5;