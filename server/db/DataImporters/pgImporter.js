// const fs = require("fs");
// const fastcsv = require("fast-csv");
// const pool = require('../postgresqlDB.js');

// let stream = fs.createReadStream("server/data/Reviews_CSV/reviews_00.csv");
// let reviewsCsvData = [];
// let reviewsCsvStream = fastcsv
//   .parse()
//   .on("data", function(data) {
//     reviewsCsvData.push(data);
//   })
//   .on("end", function() {
//     // remove the headers
//     reviewsCsvData.shift();

//     // create a query to insert each row into the psqlDB
//     const query =
//       "INSERT INTO reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)";

//     pool.connect((err, client, done) => {
//       if (err) throw err;
//       try {
//         reviewsCsvData.forEach(row => {
//           console.log(row);
//           client.query(query, row, (err, res) => {
//             if (err) {
//               console.log(err.stack);
//             }
//           });
//         });
//       } finally {
//         done();
//       }
//     })
//   });

//   stream.pipe(reviewsCsvStream);