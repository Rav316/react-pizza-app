--liquibase formatted sql

--changeset alex:1
INSERT INTO category (title)
VALUES
    ('Мясные'),
    ('Сырные'),
    ('Овощные'),
    ('Грибные'),
    ('Морские')
ON CONFLICT (title) DO NOTHING;

--changeset alex:2
INSERT INTO pizza_type (title)
VALUES
    ('тонкое'),
    ('традиционное')
ON CONFLICT (title) DO NOTHING;

--changeset alex:3
INSERT INTO pizza_size (value)
VALUES (25), (30), (35)
ON CONFLICT (value) DO NOTHING;

--changeset alex:4
INSERT INTO pizza (id, title, image_url, category_id, rating)
VALUES
    (1, 'Охотничья', 'https://media.dodostatic.net/image/r:292x292/019635b27c727302835040e5d7c27caa.avif', 4, 10),
    (2, 'Креветка и песто', 'https://media.dodostatic.net/image/r:292x292/019591b642d87304a62d322945990861.avif', 5, 10),
    (3, 'Аррива!', 'https://media.dodostatic.net/image/r:292x292/019591a0591d7642b97bf6ed6da45252.avif', 1, 10),
    (4, 'Четыре сыра 🌿', 'https://media.dodostatic.net/image/r:292x292/11ee7d612a1c13cbbfcc286c332d7762.avif', 2, 10),
    (5, 'Чилл Грилл', 'https://media.dodostatic.net/image/r:292x292/019591c69fac7921a27e4ecd8c99f9df.avif', 1, 10),
    (6, 'Креветки блю чиз', 'https://media.dodostatic.net/image/r:292x292/0195ca1dcb2f7341b78534772343b047.avif', 5, 10),
    (7, 'Сырная 🌿👶', 'https://media.dodostatic.net/image/r:292x292/11ee7d610d2925109ab2e1c92cc5383c.avif', 2, 10),
    (8, 'Пепперони фреш', 'https://media.dodostatic.net/image/r:292x292/11ee7d612fc7b7fca5be822752bee1e5.avif', 1, 10);

--changeset alex:5
-- For pizza 1 (base price 629)
INSERT INTO pizza_item (pizza_id, pizza_type_id, pizza_size_id, price)
VALUES
    (1, 1, 1, 629),   -- thin 25 cm: base price
    (1, 1, 2, 719),   -- thin 30 cm: +90
    (1, 1, 3, 809),   -- thin 35 cm: +180
    (1, 2, 1, 679),   -- traditional 25 cm: +50
    (1, 2, 2, 769),   -- traditional 30 cm: +140
    (1, 2, 3, 859)    -- traditional 35 cm: +230
ON CONFLICT DO NOTHING;

-- For pizza 2 (base price 699)
INSERT INTO pizza_item (pizza_id, pizza_type_id, pizza_size_id, price)
VALUES
    (2, 1, 1, 699),   -- thin 25 cm
    (2, 1, 2, 799),   -- thin 30 cm: +100
    (2, 1, 3, 899),   -- thin 35 cm: +200
    (2, 2, 1, 749),   -- traditional 25 cm: +50
    (2, 2, 2, 849),   -- traditional 30 cm: +150
    (2, 2, 3, 949)    -- traditional 35 cm: +250
ON CONFLICT DO NOTHING;

-- For pizza 3 (base price 629)
INSERT INTO pizza_item (pizza_id, pizza_type_id, pizza_size_id, price)
VALUES
    (3, 1, 1, 629),   -- thin 25 cm
    (3, 1, 2, 709),   -- thin 30 cm: +80
    (3, 1, 3, 789),   -- thin 35 cm: +160
    (3, 2, 1, 679),   -- traditional 25 cm: +50
    (3, 2, 2, 759),   -- traditional 30 cm: +130
    (3, 2, 3, 839)    -- traditional 35 cm: +210
ON CONFLICT DO NOTHING;

-- For pizza 4 (base price 559)
INSERT INTO pizza_item (pizza_id, pizza_type_id, pizza_size_id, price)
VALUES
    (4, 1, 1, 559),   -- thin 25 cm
    (4, 1, 2, 639),   -- thin 30 cm: +80
    (4, 1, 3, 719),   -- thin 35 cm: +160
    (4, 2, 1, 609),   -- traditional 25 cm: +50
    (4, 2, 2, 689),   -- traditional 30 cm: +130
    (4, 2, 3, 769)    -- traditional 35 cm: +210
ON CONFLICT DO NOTHING;

-- For pizza 5 (base price 539)
INSERT INTO pizza_item (pizza_id, pizza_type_id, pizza_size_id, price)
VALUES
    (5, 1, 1, 539),   -- thin 25 cm
    (5, 1, 2, 619),   -- thin 30 cm: +80
    (5, 1, 3, 699),   -- thin 35 cm: +160
    (5, 2, 1, 589),   -- traditional 25 cm: +50
    (5, 2, 2, 669),   -- traditional 30 cm: +130
    (5, 2, 3, 749)    -- traditional 35 cm: +210
ON CONFLICT DO NOTHING;

-- For pizza 6 (base price 679)
INSERT INTO pizza_item (pizza_id, pizza_type_id, pizza_size_id, price)
VALUES
    (6, 1, 1, 679),   -- thin 25 cm
    (6, 1, 2, 779),   -- thin 30 cm: +100
    (6, 1, 3, 879),   -- thin 35 cm: +200
    (6, 2, 1, 729),   -- traditional 25 cm: +50
    (6, 2, 2, 829),   -- traditional 30 cm: +150
    (6, 2, 3, 929)    -- traditional 35 cm: +250
ON CONFLICT DO NOTHING;

-- For pizza 7 (base price 269)
INSERT INTO pizza_item (pizza_id, pizza_type_id, pizza_size_id, price)
VALUES
    (7, 1, 1, 269),   -- thin 25 cm
    (7, 1, 2, 319),   -- thin 30 cm: +50
    (7, 1, 3, 369),   -- thin 35 cm: +100
    (7, 2, 1, 299),   -- traditional 25 cm: +30
    (7, 2, 2, 349),   -- traditional 30 cm: +80
    (7, 2, 3, 399)    -- traditional 35 cm: +130
ON CONFLICT DO NOTHING;

-- For pizza 8 (base price 269)
INSERT INTO pizza_item (pizza_id, pizza_type_id, pizza_size_id, price)
VALUES
    (8, 1, 1, 269),   -- thin 25 cm
    (8, 1, 2, 319),   -- thin 30 cm: +50
    (8, 1, 3, 369),   -- thin 35 cm: +100
    (8, 2, 1, 299),   -- traditional 25 cm: +30
    (8, 2, 2, 349),   -- traditional 30 cm: +80
    (8, 2, 3, 399)    -- traditional 35 cm: +130
ON CONFLICT DO NOTHING;
