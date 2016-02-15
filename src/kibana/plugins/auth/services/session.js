define(function (require) {
  var module = require('modules').get('apps/auth');
  var _ = require("lodash");

  module.service('Session', function ($http, $cookies, $document) {

    this.check = function() {
      if ($cookies.authenticated) {
        this.authenticated = true;
        return true;
      }
      return false;
    }

    this.create = function (sessionId, userId, userRole) {
      this.id = sessionId;
      this.userId = userId;
      this.userRole = userRole;
    };

    this.destroy = function () {
      return $http.get("/auth/logout")
      .then(function(){
        $cookies["connect.sid"] = "";
        $cookies["authenticated"] = "";
      })
    };
  });
});
