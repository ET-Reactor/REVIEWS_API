const pool = require('../db/postgresqlDB.js');

module.exports = {

  getReview: async (id, page, count, sort, cb) => {
    const reviews = await pool.query('SELECT reviews.id, product_id, rating, summary, body, recommend, response, date, reviewer_name, helpfulness, photos.id, review_id, url FROM reviews FULL OUTER JOIN photos ON reviews.id = photos.review_id WHERE reviews.product_id = $1 LIMIT $2 OFFSET (($3 - 1) * $1)', [id, count, page]);
    cb(reviews);
  },

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