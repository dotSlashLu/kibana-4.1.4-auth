define(function(require) {
  var angular = require('angular');
  var module = require('modules').get('apps/auth');
  var Notifier = require('components/notify/_notifier');
  require("plugins/auth/services/session")

  module.factory('AuthService', function($http, $location, Session) {
    var authService = {};
    var notify = new Notifier({ location: 'Kibana' });

    authService.init = function() {
      Session.check();
    }

    authService.login = function(credentials) {
      return $http.post('/auth/login', credentials)
        .then(function(res) {
          Session.authenticated = true;
          return res.data.user;
        })
        .catch(function(err) {
          notify.warning("Authentication failed");
        })
    };

    authService.logout = function() {
      Session.destroy()
      .then(function(){
        $location.path("/auth");
      })
      .catch(function(){
        notify.warning("Logout failed");
      })
    }

    authService.isAuthenticated = function() {
      return Session.authenticated;
    };

    authService.isAuthorized = function(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;
  });
});
