const pool = require('../db/postgresqlDB.js');
const { Pool } = require('pg');

module.exports = {

  getReview: async (id, page, count, sort, cb) => {
    const reviews = await pool.query('SELECT * FROM reviews where productid = $1', [id]);
    console.log(reviews);
    cb(reviews);
  },
  // const reviews = await pool.query('SELECT id, product_id, rating, summary, body, recommend, response, date, reviewer_name, helpfulness FROM reviews WHERE product_id = $1 LIMIT $2 OFFSET (($3 - 1) * $1)', [id, count]);
  //const reviews = await pool.query(`select * from reviews where product_id = 3`);

  getMeta: (id) => {

  },

  addReview: function (obj) {
    // mongoDB/postgreSQL queries
  },

  markRHelpful: function(r_id) {
    // mongoDB/postgreSQL queries
  },

  reportReview: function(r_id) {
    // mongoDB/postgreSQL queries
  },

};