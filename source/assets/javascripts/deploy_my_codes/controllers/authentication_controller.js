(function() {
  var AuthenticationController = function($scope, $auth) {
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function(response) {
        console.log(response);
      });
    };
  };

  angular.module('DeployMyCodes').controller('AuthenticationCtrl', ['$scope', '$auth', AuthenticationController]);
})();
