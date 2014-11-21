require.register('deploy_my_codes/middlewares/templates', function(exports, require, module){
  module.exports = function($templateCache) {

    _.each(['dashboard', 'sign_up', 'sign_in', 'menu/authenticated', 'menu/not_authenticated'], function(name) {
      var templateString = require('templates/' + name)();
      $templateCache.put('/' + name, templateString);
    });
  };
});
