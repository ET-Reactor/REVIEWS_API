\c reviewsapi
---- Drop Tables If Exists ----
  DROP TABLE IF EXISTS reviews CASCADE;
  DROP TABLE IF EXISTS photos CASCADE;
  DROP TABLE IF EXISTS characteristics CASCADE;
  DROP TABLE IF EXISTS characteristics_reviews CASCADE;

---- Create Tables ----
  -- reviews table --
  CREATE TABLE IF NOT EXISTS reviews (id SERIAL, product_id INT, rating INT, date VARCHAR(14), summary TEXT, body TEXT, recommend BOOLEAN, reported BOOLEAN, reviewer_name TEXT, reviewer_email TEXT, response TEXT, helpfulness INT, PRIMARY KEY (id));
  -- photos table --
  CREATE TABLE IF NOT EXISTS photos (photos_id SERIAL, review_id INT NOT NULL, url TEXT, PRIMARY KEY (photos_id), FOREIGN KEY (review_id) REFERENCES reviews (id));
  -- characteristics table --
  CREATE TABLE IF NOT EXISTS characteristics (id SERIAL, product_id INT NOT NULL, names VARCHAR(8), PRIMARY KEY (id));
  -- characteristics_reviews table --
  CREATE TABLE IF NOT EXISTS characteristics_reviews (id SERIAL, characteristic_id INT NOT NULL, review_id INT NOT NULL, value INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (characteristic_id) REFERENCES characteristics (id), FOREIGN KEY (review_id) REFERENCES reviews (id));

---- Create Indexes ----
  CREATE INDEX IF NOT EXISTS pk_id_idx ON reviews (id);
  CREATE INDEX IF NOT EXISTS product_id_idx ON reviews (product_id);
  CREATE INDEX IF NOT EXISTS review_id_idx ON photos (review_id);
  CREATE INDEX IF NOT EXISTS photos_id_idx ON photos (photos_id);
  CREATE INDEX IF NOT EXISTS rating_idx ON reviews (rating);
  CREATE INDEX IF NOT EXISTS char_review_id_idx ON characteristics_reviews (review_id);

  -- INSERT INTO reviews (id) VALUES (1);
  -- INSERT INTO photos (photos_id, review_id) VALUES (1, -1);
  -- INSERT INTO characteristics (id, product_id) VALUES (1, -1);
  -- INSERT INTO characteristics_reviews (id, characteristic_id, review_id, value) VALUES (1, -1, -1, -1);

---- COPY from CSV Files ----
  \copy reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness ) FROM '/Users/roshanupatel/Hack Reactor Precourse/SDC Group Project/Reviews_API/server/data/Reviews_CSV/reviews.csv' DELIMITER ',' NULL AS 'null' CSV HEADER;

  \copy photos (photos_id, review_id, url) FROM '/Users/roshanupatel/Hack Reactor Precourse/SDC Group Project/Reviews_API/server/data/Reviews_Photos_CSV/reviews_photos.csv' DELIMITER ',' NULL AS 'null' CSV HEADER;

  \copy characteristics (id, product_id, names) FROM '/Users/roshanupatel/Hack Reactor Precourse/SDC Group Project/Reviews_API/server/data/Characteristics_CSV/characteristics.csv' DELIMITER ',' NULL AS 'null' CSV HEADER;

  \copy characteristics_reviews (id, characteristic_id, review_id, value) FROM '/Users/roshanupatel/Hack Reactor Precourse/SDC Group Project/Reviews_API/server/data/Reviews_Characteristics_CSV/characteristic_reviews.csv' DELIMITER ',' NULL AS 'null' CSV HEADER;

--- Reset indexing sequences ---
  SELECT setval('reviews_id_seq', max(id)) FROM reviews;
  SELECT setval('characteristics_id_seq', max(id)) FROM characteristics;
  SELECT setval('photos_photos_id_seq', max(photos_id)) FROM photos;
  SELECT setval('characteristics_reviews_id_seq', max(id)) FROM characteristics_reviews;