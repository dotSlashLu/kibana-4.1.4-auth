var path = require("path");
var config = require("../../config/");
var request = require("superagent");
var Promise = require("bluebird");
request = Promise.promisifyAll(request);

module.exports = function(req, res, next) {
  var api = config.kibana.ldap_api;
  request
  .get(api)
  .query({
    name: req.body.username,
    passwd: decodeURIComponent(req.body.password)
  })
  .endAsync(function(error, ret) {
    if (!ret || !ret.text)
      return res.sendStatus(403);
    ret = JSON.parse(ret.text);
    if (ret.status == -1)
      return res.sendStatus(403);
    res.json({
      sid: 1,
      user: {
        id: 1,
        role: []
      },
      data: ret
    });
  })
  .catch(next);
}
