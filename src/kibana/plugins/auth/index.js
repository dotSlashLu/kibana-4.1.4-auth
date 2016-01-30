define(function (require, module, exports) {
  require('plugins/auth/controllers/auth');

  var apps = require('registry/apps');
  apps.register(function DocAppModule() {
    return {
      id: 'auth',
      name: 'auth',
      order: -1
    };
  });
});
