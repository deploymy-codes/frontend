require.register('deploy_my_codes/controllers/authentication_controller', function(exports, require, module){
  module.exports = function($scope, $state, AuthenticationService) {
    $scope.logout = function() {
      AuthenticationService.logout().then(function() {
        $state.go('sign_in');
      });
    };
  };
});
