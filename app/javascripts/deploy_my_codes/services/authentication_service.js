require.register('deploy_my_codes/services/authentication_service', function(exports, require, module){
  module.exports = function($q, $rootScope, AuthenticationRepository, UserService) {
    var _ = require('underscore');

    var authenticationAction = function(code) {
      var deferred = $q.defer();

      AuthenticationRepository.save(code)
        .then(function(data) {
          UserService.register(data).then(function(user) {
            $rootScope.$broadcast('successfullyLogin');
            deferred.resolve(user);
          });
        });

      return deferred.promise;
    };

    var logoutAction = function() {
      var deferred = $q.defer();

      UserService.remove().then(function() {
        $rootScope.$broadcast('successfullyLogout');
        deferred.resolve();
      });

      return deferred.promise;
    };

    return {
      authenticate: authenticationAction,
      logout:       logoutAction
    };
  };
});
