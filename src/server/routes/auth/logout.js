var _ = require("lodash");

module.exports = function(req, res, next) {
  req.session.destroy();
  res.status(200).send();
}
