--liquibase formatted sql

--changeset alex:1
INSERT INTO ingredient (title)
VALUES ('Моцарелла'),
       ('Сыр блю чиз'),
       ('Чеддер'),
       ('Пармезан'),
       ('Охотничьи колбаски'),
       ('Ветчина'),
       ('Пепперони'),
       ('Грибы'),
       ('Шампиньоны'),
       ('Креветки'),
       ('Песто'),
       ('Томаты'),
       ('Маслины'),
       ('Перец болгарский'),
       ('Красный лук'),
       ('Огурцы маринованные'),
       ('Острый перец'),
       ('Кукуруза'),
       ('Соус барбекю'),
       ('Соус чесночный')
ON CONFLICT (title) DO NOTHING;

--changeset alex:2

-- Пицца 1: Охотничья
INSERT INTO pizza_ingredient (pizza_id, ingredient_id)
SELECT 1, id
FROM ingredient
WHERE title IN (
                'Охотничьи колбаски', 'Моцарелла', 'Шампиньоны', 'Томаты', 'Соус барбекю'
    );

-- Пицца 2: Креветка и песто
INSERT INTO pizza_ingredient (pizza_id, ingredient_id)
SELECT 2, id
FROM ingredient
WHERE title IN (
                'Креветки', 'Песто', 'Моцарелла', 'Томаты'
    );

-- Пицца 3: Аррива!
INSERT INTO pizza_ingredient (pizza_id, ingredient_id)
SELECT 3, id
FROM ingredient
WHERE title IN (
                'Ветчина', 'Пепперони', 'Кукуруза', 'Соус барбекю', 'Моцарелла'
    );

-- Пицца 4: Четыре сыра 🌿
INSERT INTO pizza_ingredient (pizza_id, ingredient_id)
SELECT 4, id
FROM ingredient
WHERE title IN (
                'Моцарелла', 'Сыр блю чиз', 'Чеддер', 'Пармезан'
    );

-- Пицца 5: Чилл Грилл
INSERT INTO pizza_ingredient (pizza_id, ingredient_id)
SELECT 5, id
FROM ingredient
WHERE title IN (
                'Пепперони', 'Огурцы маринованные', 'Красный лук', 'Моцарелла'
    );

-- Пицца 6: Креветки блю чиз
INSERT INTO pizza_ingredient (pizza_id, ingredient_id)
SELECT 6, id
FROM ingredient
WHERE title IN (
                'Креветки', 'Сыр блю чиз', 'Моцарелла'
    );

-- Пицца 7: Сырная 🌿👶
INSERT INTO pizza_ingredient (pizza_id, ingredient_id)
SELECT 7, id
FROM ingredient
WHERE title IN (
                'Моцарелла', 'Чеддер', 'Пармезан'
    );

-- Пицца 8: Пепперони фреш
INSERT INTO pizza_ingredient (pizza_id, ingredient_id)
SELECT 8, id
FROM ingredient
WHERE title IN (
                'Пепперони', 'Томаты', 'Моцарелла', 'Острый перец'
    );