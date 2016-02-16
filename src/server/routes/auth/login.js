var config = require("../../config/");
var request = require("superagent");
var Promise = require("bluebird");
request = Promise.promisifyAll(request);

module.exports = function(req, res, next) {
  var api = config.kibana.ldap_api;

  request
  .post(api)
  .send('name=' + req.body.username)
  .send('passwd=' + encodeURIComponent(req.body.password))
  .endAsync(function(error, ret) {
    if (!ret || !ret.text)
      return res.sendStatus(403);
    ret = JSON.parse(ret.text);
    if (ret.status == -1)
      return res.sendStatus(403);
    var authStr = new Buffer(req.body.username + ":" + req.body.password).toString("base64");
    req.session.authHeader = "Basic " + authStr;

    // @lu: no danger using cookies here,
    // we authorize users in the backend,
    // this is just for UI
    res.cookie("authenticated", 1, {
      expires: new Date(Date.now() + config.kibana.session_cookie_max_age * 1000)
    });
    res.json({
      // @lu: all fields are reserved for future authorization feature
      // now we just do simple authentication
      user: {
        id: 1,
        role: []
      },
      data: ret
    });
  })
  .catch(next);
}
