\c reviewsapi

-- COPY reviews (
--   id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness )
-- FROM '/Users/roshanupatel/Hack Reactor Precourse/SDC Group Project/Reviews_API/server/data/Reviews_CSV/reviews.csv' DELIMITER ','
-- NULL AS 'null' CSV HEADER;

-- COPY photos (id, review_id, url)
-- FROM '/Users/roshanupatel/Hack Reactor Precourse/SDC Group Project/Reviews_API/server/data/Reviews_Photos_CSV/reviews_photos.csv' DELIMITER ',' NULL AS 'null' CSV HEADER;

-- COPY characteristics (id, product_id, names)
-- FROM '/Users/roshanupatel/Hack Reactor Precourse/SDC Group Project/Reviews_API/server/data/Characteristics_CSV/characteristics.csv' DELIMITER ',' NULL AS 'null' CSV HEADER;

-- COPY characteristics_reviews (id, characteristic_id, review_id, value)
-- FROM '/Users/roshanupatel/Hack Reactor Precourse/SDC Group Project/Reviews_API/server/data/Reviews_Characteristics_CSV/characteristic_reviews.csv' DELIMITER ',' NULL AS 'null' CSV HEADER;