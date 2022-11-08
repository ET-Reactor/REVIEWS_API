const models = require('../models');

module.exports = {

  getReviews: (req, res) => {
    let page = req.params.page;
    let count = req.params.count;
    let prodID = req.params.id;
    let sort = req.params.sort;
    models.getReviews(prodID, page, count, sort, (reviews) => {
      res.send(reviews);
    });
  },

  getMeta: (req, res) => {
    //models. ...
    let prodID = req.params.id;
    models.getMeta(prodID, (meta) => {
      res.send(meta);
    });
  },

  postRev: (req, res) => {
    models.addReview(req.body, (err) => {
      res.send(err);
    });
  },

  helpfulRev: (req, res) => {
    //models. ...
    let reviewID = req.params.id;
    models.markHelpful(reviewID, (err) => {
      res.send(err);
    });
  },

  reportRev: (req, res) => {
    //models. ...
    let reviewID = req.params.id;
    console.log(req);
    models.reportReview(reviewID, (err) => {
      res.send(err);
    });
  }

}