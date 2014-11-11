(function() {
  var MenuController = function($scope, UserService) {
    $scope.user = {};

    $scope.getUser = function() {
      UserService.get().then(function(user) {
        $scope.user = user;
      });
    };

    $scope.$on('successfullyLogin',  $scope.getUser);
    $scope.$on('successfullyLogout', $scope.getUser);
  };

  angular.module('DeployMyCodes').controller('MenuCtl', ['$scope', 'UserService', MenuController]);
})();
