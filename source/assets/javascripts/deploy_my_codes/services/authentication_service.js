(function() {
  var AuthenticationService = function($auth, $q, $rootScope, _, UserService) {
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

    var logoutAction = function(provider) {
      return $q(function(resolve, reject) {
       $auth.logout().then(function(response) {
         $rootScope.$broadcast('successfullyLogout');
         resolve(response);
       });
      });
    };

    return {
      authenticate: authenticationAction,
      logout:       logoutAction
    };
  };

  angular.module('DeployMyCodes').service('AuthenticationService', ['$auth', '$q', '$rootScope', '_', 'UserService', AuthenticationService]);
})();
