const pool = require('../db/postgresqlDB.js');
const { Pool } = require('pg');

module.exports = {

  getReviews: async (id, page, count, sort, cb) => {
    const client = await pool.connect();
    let prodID = Number(id);
    let numberCount = Number(count);
    let pageCount = Number(page);
    let returnObj = {
      product: prodID,
      page: pageCount,
      count: numberCount,
      results: []
    };
    try {
      const reviews = await client.query('SELECT reviews.id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos_id, photos.review_id, photos.url FROM reviews LEFT JOIN photos ON photos.review_id = reviews.id WHERE reviews.product_id = $1 LIMIT $2 OFFSET (($3 - 1) * $1)', [prodID, numberCount, pageCount]);


      // loop through the query rows to input properly into returnObj for front-end
      for (let i = 0; i < reviews.rows.length; i++) {
        // check to see if the returnObj has any results inputted yet
        if (returnObj.results.length === 0) { // first row of the query result
          returnObj.results[0] = {
            review_id: reviews.rows[0].id,
            rating: reviews.rows[0].rating,
            summary: reviews.rows[0].summary,
            recommend: reviews.rows[0].recommend,
            response: reviews.rows[0].response,
            body: reviews.rows[0].body,
            date: reviews.rows[0].date,
            reviewer_name: reviews.rows[0].reviewer_name,
            helpfulness: reviews.rows[0].helpfulness,
            photos: []
          }
          if (reviews.rows[0].photos_id !== null) { // if it has photos, add them
            let currentPhoto = {
              id: reviews.rows[0].photos_id,
              url: reviews.rows[0].url
            };
            returnObj.results[0].photos.push(currentPhoto);
          }
        }
        else { // 2nd row + of the query result
          let isFound = false;
          for (let k = 0; k < returnObj.results.length; k++) {
            if (returnObj.results[k].review_id === reviews.rows[i].id &&
                reviews.rows[i].photos_id !== null) {
              let currentPhoto = {
                id: reviews.rows[i].photos_id,
                url: reviews.rows[i].url
              }
              returnObj.results[k].photos.push(currentPhoto);
              isFound = true;
            }
            if (isFound) {break};
          }
          if (!isFound) {
            let newRev = {
              review_id: reviews.rows[i].id,
              rating: reviews.rows[i].rating,
              summary: reviews.rows[i].summary,
              recommend: reviews.rows[i].recommend,
              response: reviews.rows[i].response,
              body: reviews.rows[i].body,
              date: reviews.rows[i].date,
              reviewer_name: reviews.rows[i].reviewer_name,
              helpfulness: reviews.rows[i].helpfulness,
              photos: []
            }
            if (reviews.rows[i].photos_id !== null) { // if it has photos, add them
              let currentPhoto = {
                id: reviews.rows[i].photos_id,
                url: reviews.rows[i].url
              };
              newRev.photos.push(currentPhoto);
            }
            returnObj.results.push(newRev);
          }
        }
      }

      // const reviews = await client.query('SELECT id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness FROM reviews WHERE product_id = $1 LIMIT $2 OFFSET (($3 - 1) * $1)', [prodID, numberCount, pageCount]);
      // let returnObj = {
      //   product: prodID,
      //   page: pageCount,
      //   count: numberCount,
      //   results: []
      // };
      // for (let i = 0; i < reviews.rows.length; i++) {
      //   const photos = await client.query('SELECT id, url FROM photos WHERE review_id = $1', [reviews.rows[i].id]);
      //   returnObj.results[i] = {
      //     review_id: reviews.rows[i].id,
      //     rating: reviews.rows[i].rating,
      //     summary: reviews.rows[i].summary,
      //     recommend: reviews.rows[i].recommend,
      //     response: reviews.rows[i].response,
      //     body: reviews.rows[i].body,
      //     date: reviews.rows[i].date,
      //     reviewer_name: reviews.rows[i].reviewer_name,
      //     helpfulness: reviews.rows[i].helpfulness,
      //     photos: photos.rows
      //   }
      // }


      cb(null, returnObj);
    } catch (err) {
      console.log(err);
      cb(err, null);
    } finally {
      client.release();
    }
  },

  getMeta: async (id, cb) => {
    let prodID = Number(id);
    let returnObj = {
      product_id: prodID,
      ratings: {},
      recommended: {},
      characteristics: {},
    };

    const client = await pool.connect();
    try {
      // query the number of each star rating & construct the return object --> returnObj
      const metaRtng1 = await client.query('SELECT COUNT(rating) FROM reviews WHERE rating = 1 AND product_id = $1', [prodID]);
      returnObj.ratings["1"] = metaRtng1.rows[0].count;
      const metaRtng2 = await client.query('SELECT COUNT(rating) FROM reviews WHERE rating = 2 AND product_id = $1', [prodID]);
      returnObj.ratings["2"] = metaRtng2.rows[0].count;
      const metaRtng3 = await client.query('SELECT COUNT(rating) FROM reviews WHERE rating = 3 AND product_id = $1', [prodID]);
      returnObj.ratings["3"] = metaRtng3.rows[0].count;
      const metaRtng4 = await client.query('SELECT COUNT(rating) FROM reviews WHERE rating = 4 AND product_id = $1', [prodID]);
      returnObj.ratings["4"] = metaRtng4.rows[0].count;
      const metaRtng5 = await client.query('SELECT COUNT(rating) FROM reviews WHERE rating = 5 AND product_id = $1', [prodID]);
      returnObj.ratings["5"] = metaRtng5.rows[0].count;

      // query all the reviews that matches the product ID and get the recommend values
      const recommends = await client.query('SELECT recommend FROM reviews WHERE product_id = $1', [prodID]);
        // iterate through the given rows, count the trues and falses and apply to returnObj
      let falses = 0;
      let trues = 0;
      for (let i = 0; i < recommends.rows.length; i++) {
        if (recommends.rows[i].recommend === true) {
          trues++;
        } else if (recommends.rows[i].recommend === false) {
          falses++;
        }
      }
      returnObj.recommended.false = falses;
      returnObj.recommended.true = trues;

      // query the char names/char_rev values/char_rev id's from the three tables with the char_revs inner joined with the char and where the char_revs review_id matches the reviews id and where reviews product_id matches the called for product ID.
        // INNER JOIN might not be necessary here the way it is Queried.
      const characteristics = await client.query('SELECT characteristics.names, characteristics_reviews.value, characteristics_reviews.id FROM reviews, characteristics_reviews INNER JOIN characteristics ON characteristic_id = characteristics.id WHERE characteristics_reviews.review_id = reviews.id AND reviews.product_id = $1', [prodID]);

        // totalObj will count the totals of each characteristic name as a key whose each property is a total count of # of times that key appears
      var totalObj = {};
        // loop through the rows and add into the returnObj where the .values of each name is a summation of all that name's ratings and the .id of each name is the char_revs id
      for (let i = 0; i < characteristics.rows.length; i++) {
        if (returnObj.characteristics.hasOwnProperty([characteristics.rows[i].names])) {
          totalObj[characteristics.rows[i].names]++;
          returnObj.characteristics[characteristics.rows[i].names].value = returnObj.characteristics[characteristics.rows[i].names].value + characteristics.rows[i].value;
        } else {
          totalObj[characteristics.rows[i].names] = 1;
          returnObj.characteristics[characteristics.rows[i].names] = {};
          returnObj.characteristics[characteristics.rows[i].names].id = characteristics.rows[i].id;
          returnObj.characteristics[characteristics.rows[i].names].value = characteristics.rows[i].value;
        }
      }
        // with the total # and the value totals, get the averages for the final name.value in the returnObj
      for (keys in returnObj.characteristics) {
        returnObj.characteristics[keys].value = returnObj.characteristics[keys].value/totalObj[keys];
      }
      //return the piece-by-piece constructed object
      cb(null, returnObj);
    } catch (err) {
      cb(err, null);
    } finally {
      client.release();
    }
  },

  addReview: async function (reviewObj, cb) {
    // mongoDB/postgreSQL queries
    currentDate = "00000000000";
    const client = await pool.connect();
    try {
      //const maxIDquery = await client.query('SELECT max(id) from reviews');
      //const maxID = maxIDquery.rows[0].max + 1;
      const reviewID = await client.query('INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id', [ reviewObj.product_id, reviewObj.rating, currentDate, reviewObj.summary, reviewObj.body, reviewObj.recommend, false, reviewObj.name, reviewObj.email, 0 ]);
      if (reviewObj.photos.length !== 0) {
        for (let i = 0; i < reviewObj.photos.length; i++) {
          //var photosMax = await client.query('SELECT max(id) from photos');
          //var maxPhotoID = photosMax.rows[0].max + 1;
          await client.query('INSERT INTO photos (review_id, url) VALUES ($1, $2)', [ reviewID.rows[0].id, reviewObj.photos[i] ])
            .catch(e => {
              cb(e, null);
            });
        }
      }
      if (Object.keys(reviewObj.characteristics).length !== 0) {
        for (keys in reviewObj.characteristics) {
          let charId = Number(keys);
          let value = reviewObj.characteristics[keys];
          await client.query('INSERT INTO characteristics_reviews (characteristic_id, review_id, value) VALUES ($1, $2, $3)', [ charId, reviewID.rows[0].id, value])
        }
      }
      cb(null, 'success');
    } catch (err) {
      cb(err, null);
    } finally {
      client.release();
    }
  },

  markHelpful: async function(r_id, cb) {
    // mongoDB/postgreSQL queries
    const client = await pool.connect();
    try {
      await client.query('UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1', [r_id]);
      cb(null, 'success');
    } catch (err) {
      cb(err, null);
    } finally {
      client.release();
    }
  },

  reportReview: async function(r_id, cb) {
    // mongoDB/postgreSQL queries
    const client = await pool.connect();
    try {
      await client.query('UPDATE reviews SET reported = true WHERE id = $1', [r_id]);
      cb(null, 'success');
    } catch (err) {
      cb(err, null);
    } finally {
      client.release();
    }
  },

};