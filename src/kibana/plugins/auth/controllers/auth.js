define(function (require) {
  var app = require('modules').get('apps/auth');
  require('plugins/auth/services/auth');

  require('routes')
  .when('/auth', {
    template: require('text!plugins/auth/templates/index.html')
  })

  app.controller('LoginController', function ($scope,
                                              $window,
                                              $document,
                                              $rootScope,
                                              $location,
                                              AUTH_EVENTS,
                                              AuthService,
                                              Session) {
    // @lu: if we have session stored in the cookie
    // restore session and redirect
    if (Session.check()) {
      // $scope.setCurrentUser(user);
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      redirect();
      return ;
    }

    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.login = function (credentials) {
      AuthService.login(credentials).then(function (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);
        redirect();
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    }

    function redirect() {
      // @lu: this might be improved by remembering the last URI
      // before redirecting
      var prevUrl = '/';
      $location.path(prevUrl);
    }
  });
});

