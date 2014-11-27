require.register('deploy_my_codes/controllers/menu_controller', function(exports, require, module){
  module.exports = function($scope, UserService) {
    $scope.user = {};

    $scope.getUser = function() {
      UserService.get().then(function(user) {
        $scope.user = user;
      });
    };

    $scope.$on('successfullyLogin',  $scope.getUser);
    $scope.$on('successfullyLogout', $scope.getUser);
  };
});
