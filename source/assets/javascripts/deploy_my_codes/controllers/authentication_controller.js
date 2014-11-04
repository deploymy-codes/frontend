(function() {
  var AuthenticationController = function($scope, $state, AuthenticationService) {
    $scope.authenticate = function(provider) {
      AuthenticationService.authenticate(provider).then(function(response) {
        $state.go('dashboard');
      });
    };

    $scope.logout = function() {
      AuthenticationService.logout().then(function() {
        $state.go('sign_in');
      });
    };
  };

  angular.module('DeployMyCodes').controller('AuthenticationCtrl', ['$scope', '$state', 'AuthenticationService', AuthenticationController]);
})();
