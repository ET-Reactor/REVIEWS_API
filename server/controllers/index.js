const models = require('../models');

const getAllQ = (req, res) => {
  res.status(200).send("get success")
}

module.exports.getAllQ = getAllQ;