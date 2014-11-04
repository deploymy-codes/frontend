(function() {
  var MenuController = function($scope, UserService) {
    $scope.user = {};

    function loadUser() {
      UserService.user().then(function(current_user) {
        $scope.user = current_user;
      });
    };

    $scope.$on('successfullyLogin',  loadUser);
    $scope.$on('successfullyLogout', loadUser);

    loadUser();
  };

  angular.module('DeployMyCodes').controller('MenuCtl', ['$scope', 'UserService', MenuController]);
})();
