const {Pool} = require('pg');

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
  'CREATE TABLE IF NOT EXISTS photos (id SERIAL, review_id INT NOT NULL, photos TEXT UNIQUE, PRIMARY KEY (id), FOREIGN KEY (review_id) REFERENCES reviews (id))'
)
  .then((res)=>{})
  .catch((err)=>{});

pool.query(
  'CREATE TABLE IF NOT EXISTS characteristics (id SERIAL, product_id INT NOT NULL, names VARCHAR(8), PRIMARY KEY (id))'
)
  .then((res)=>{})
  .catch((err)=>{});

pool.query(
  'CREATE TABLE IF NOT EXISTS characteristics_reviews (characteristic_id INT NOT NULL, review_id INT NOT NULL, value INT NOT NULL, PRIMARY KEY (review_id, characteristic_id), FOREIGN KEY (characteristic_id) REFERENCES characteristics (id), FOREIGN KEY (review_id) REFERENCES reviews (id))'
)
  .then((res)=>{})
  .catch((err)=>{});

  module.exports = pool;