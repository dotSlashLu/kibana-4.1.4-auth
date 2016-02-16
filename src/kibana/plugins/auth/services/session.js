define(function (require) {
  var module = require('modules').get('apps/auth');
  var _ = require("lodash");

  module.service('Session', function ($http, $cookies, $document) {

    this.check = function() {
      if ($cookies.authenticated == 1) {
        this.authenticated = true;
        return true;
      }
      return false;
    }

    this.create = function (sessionId, userId, userRole) {
      this.id = sessionId;
      this.userId = userId;
      this.userRole = userRole;
      this.authenticated = true;
    };

    this.destroy = function () {
      var s = this;
      return $http.get("/auth/logout")
      .then(function(){
        s.authenticated = false;
        delete $cookies["connect.sid"];
        delete $cookies["authenticated"];
      })
    };
  });
});
