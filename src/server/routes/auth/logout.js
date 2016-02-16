var _ = require("lodash");

module.exports = function(req, res, next) {
  req.session.destroy();
  res.cookie("authenticated", "", {expires: new Date()});
  res.status(200).send();
}
