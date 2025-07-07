--liquibase formatted sql

--changeset alex:1

ALTER TABLE pizza
ADD COLUMN description text;