(function() {
  var AuthenticationService = function($auth, $q, $rootScope) {
    var authenticationAction = function(provider) {
      return $q(function(resolve, reject) {
       $auth.authenticate(provider).then(function(response) {
         $rootScope.$broadcast('successfullyLogin');
         resolve(response);
       });
      });
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
