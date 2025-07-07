--liquibase formatted sql

--changeset alex:1

CREATE TABLE pizza_ingredient
(
    pizza_id int REFERENCES pizza(id),
    ingredient_id int REFERENCES ingredient(id),
    PRIMARY KEY (pizza_id, ingredient_id)
)