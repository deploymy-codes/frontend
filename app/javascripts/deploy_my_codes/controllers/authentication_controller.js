require.register('deploy_my_codes/controllers/authentication_controller', function(exports, require, module){
  module.exports = function($scope, $state, AuthenticationService) {
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
});
