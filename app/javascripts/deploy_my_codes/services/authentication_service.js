require.register('deploy_my_codes/services/authentication_service', function(exports, require, module){
  module.exports = function($auth, $q, $rootScope, UserService) {
    var _ = require('underscore');

    var authenticationAction = function(provider) {
      var deferred = $q.defer();

      $auth.authenticate(provider).then(function(response) {
        UserService.register(_.omit(response.data, ['api_key'])).then(function(user) {
          $rootScope.$broadcast('successfullyLogin');
          deferred.resolve(user);
        });
      });

      return deferred.promise;
    };

    var logoutAction = function() {
      var deferred = $q.defer();

       $auth.logout().then(function(response) {
         $rootScope.$broadcast('successfullyLogout');
         deferred.resolve(response);
       });

      return deferred.promise;
    };

    return {
      authenticate: authenticationAction,
      logout:       logoutAction
    };
  };
});
