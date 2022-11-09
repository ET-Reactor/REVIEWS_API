const models = require('../models');

module.exports = {

  getReviews: (req, res) => {
    let page = req.params.page;
    let count = req.params.count;
    let prodID = req.params.id;
    let sort = req.params.sort;
    models.getReviews(prodID, page, count, sort, (err, reviews) => {
      if (err) {
        res.status(404);
        res.end(err);
      } else {
        res.status(200);
        res.send(reviews);
        res.end();
      }
    });
  },

  getMeta: (req, res) => {
    //models. ...
    let prodID = req.params.id;
    models.getMeta(prodID, (err, meta) => {
      if (err) {
        res.status(404);
        res.end(err);
      } else {
        res.status(200);
        res.send(meta);
        res.end();
      }
    });
  },

  postRev: (req, res) => {
    models.addReview(req.body, (err, successStr) => {
      if (err) {
        res.status(404);
        res.end(err);
      } else {
        res.status(200);
        res.send(successStr);
        res.end();
      }
    });
  },

  helpfulRev: (req, res) => {
    //models. ...
    let reviewID = req.params.id;
    models.markHelpful(reviewID, (err, successStr) => {
      if (err) {
        res.status(404);
        res.end(err);
      } else {
        res.status(200);
        res.send(successStr);
        res.end();
      }
    });
  },

  reportRev: (req, res) => {
    //models. ...
    let reviewID = req.params.id;
    console.log(req);
    models.reportReview(reviewID, (err, successStr) => {
      if (err) {
        res.status(404);
        res.end(err);
      } else {
        res.status(200);
        res.send(successStr);
        res.end();
      }
    });
  }

}