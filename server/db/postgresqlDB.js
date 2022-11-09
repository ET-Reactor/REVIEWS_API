const { Pool } = require('pg');

const pool = new Pool({
  user: 'et',
  host: 'localhost',
  database: 'reviewsapi',
  password: '123SDC',
  port: 5432,
});

pool.query(
  'CREATE TABLE IF NOT EXISTS reviews (id SERIAL, product_id INT, rating INT, date VARCHAR(14), summary TEXT, body TEXT, recommend BOOLEAN, reported BOOLEAN, reviewer_name TEXT, reviewer_email TEXT, response TEXT, helpfulness INT, PRIMARY KEY (id))'
)
  .then((res)=>{})
  .catch((err)=>{});

pool.query(
  'CREATE TABLE IF NOT EXISTS photos (id SERIAL, review_id INT NOT NULL, url TEXT, PRIMARY KEY (id), FOREIGN KEY (review_id) REFERENCES reviews (id))'
)
  .then((res)=>{})
  .catch((err)=>{});

pool.query(
  'CREATE TABLE IF NOT EXISTS characteristics (id SERIAL, product_id INT NOT NULL, names VARCHAR(8), PRIMARY KEY (id))'
)
  .then((res)=>{})
  .catch((err)=>{});

pool.query(
  'CREATE TABLE IF NOT EXISTS characteristics_reviews (id SERIAL, characteristic_id INT NOT NULL, review_id INT NOT NULL, value INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (characteristic_id) REFERENCES characteristics (id), FOREIGN KEY (review_id) REFERENCES reviews (id))'
)
  .then((res)=>{})
  .catch((err)=>{});


// ----- create indexes
pool.query(
  'CREATE INDEX IF NOT EXISTS pk_id_idx ON reviews (id)'
  )
  .then((res)=>{})
  .catch((err)=>{});

pool.query(
  'CREATE INDEX IF NOT EXISTS product_id_idx ON reviews (product_id)'
  )
  .then((res)=>{})
  .catch((err)=>{});

pool.query(
  'CREATE INDEX IF NOT EXISTS review_id_idx ON photos (review_id)'
  )
  .then((res)=>{})
  .catch((err)=>{});

pool.query(
  'CREATE INDEX IF NOT EXISTS rating_idx ON reviews (rating)'
  )
  .then((res)=>{})
  .catch((err)=>{});

pool.query(
  'CREATE INDEX IF NOT EXISTS review_id_idx ON characteristics_reviews (review_id)'
  )
  .then((res)=>{})
  .catch((err)=>{});

  module.exports = pool;