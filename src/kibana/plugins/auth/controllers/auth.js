define(function (require) {
  var app = require('modules').get('apps/auth', []);
  require('plugins/auth/services/auth');

  require('routes')
  .when('/auth', {
    template: require('text!plugins/auth/templates/index.html')
  })

  app.controller('LoginController', function ($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {
    $scope.credentials = {
      username: '',
      password: ''
    };
    $scope.login = function (credentials) {
      AuthService.login(credentials).then(function (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);
        $location.path('/');
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
  });
});
