const models = require('../models');

module.exports = {

  getReview: (req, res) => {
    let page = req.params.page;
    let count = req.params.count;
    let prodID = req.params.id;
    let sort = req.params.sort;
    models.getReview(prodID, page, count, sort, (reviews) => {
      res.send(reviews);
    })
  },

  getMeta: (req, res) => {
    //models. ...
  },

  postRev: (req, res) => {
    //models. ...
  },

  helpfulRev: (req, res) => {
    //models. ...
  },

  reportRev: (req, res) => {
    //models. ...
  }

}