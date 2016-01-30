define(function (require) {
  var module = require('modules').get('apps/auth');

  module.service('Session', function ($http) {
    this.create = function (sessionId, userId, userRole) {
      this.id = sessionId;
      this.userId = userId;
      this.userRole = userRole;
    };
    this.destroy = function () {
      this.id = null;
      this.userId = null;
      this.userRole = null;
      $http.defaults.headers.common['Authorization'] = null;
    };
  });
});
