define(function (require) {
  var module = require('modules').get('apps/auth');
  var _ = require("lodash");

  module.service('Session', function ($http) {
    this.cookie_key = "kbn_session";
    this.cookie_expire_days = '7';

    this.get = function () {
      var cookie = getCookie(this.cookie_key);
      if (!cookie)
        return false;
      cookie = JSON.parse(cookie);
      this.create(cookie.sessionId, cookie.userId, cookie.userRole, cookie.authHeader);
      $http.defaults.headers.common['Authorization'] = 'Basic ' + cookie.authHeader;
      return true;
    };

    this.create = function (sessionId, userId, userRole, authHeader) {
      this.id = sessionId;
      this.userId = userId;
      this.userRole = userRole;
      this.authHeader = authHeader;
    };

    this.set_cookie = function() {
      setCookie(this.cookie_key, JSON.stringify({
        sessionId: this.id,
        userId: this.userId,
        userRole: this.userRole,
        authHeader: this.authHeader
      }), this.cookie_expire_days);
    }

    this.destroy = function () {
      this.id = null;
      this.userId = null;
      this.userRole = null;
      this.authHeader = null;
      $http.defaults.headers.common['Authorization'] = null;
      removeCookie(this.cookie_key);
    };
  });

  function setCookie(c_name, value, exdays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + exdays);
      var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
      document.cookie = c_name + "=" + c_value;
  }

  function getCookie(c_name) {
      var i, x, y, ARRcookies = document.cookie.split(";");
      for (i = 0; i < ARRcookies.length; i++) {
          x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
          y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
          x = x.replace(/^\s+|\s+$/g, "");
          if (x == c_name) {
              return unescape(y);
          }
      }
  }

  function removeCookie(name) {
    setCookie(name, "", -1);
  }
});
