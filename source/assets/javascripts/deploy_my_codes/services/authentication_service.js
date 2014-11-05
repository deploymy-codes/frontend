(function() {
  var AuthenticationService = function($auth, $q, $rootScope) {
    var authenticationAction = function(provider) {
      var deferred = $q.defer();

      $auth.authenticate(provider).then(function(response) {
        $rootScope.$broadcast('successfullyLogin');
        deferred.resolve(response);
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

  angular.module('DeployMyCodes').service('AuthenticationService', ['$auth', '$q', '$rootScope', AuthenticationService]);
})();
