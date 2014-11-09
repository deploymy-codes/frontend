(function() {
  var AlreadyLoggedInUser = function($rootScope, $state, UserService) {
    $rootScope.$on('$stateChangeStart', function(event, destinationState) {
      if (!destinationState.data || !angular.isFunction(destinationState.data.shouldBeRedirectedToApp)) return;
      UserService.get().then(function(user) {
        var shouldBeRedirectedToApp = destinationState.data.shouldBeRedirectedToApp(user);

        if (shouldBeRedirectedToApp) {
          event.preventDefault();
          $state.go('dashboard', {});
        }
      });
    });
  };

  angular.module('DeployMyCodes').run(['$rootScope', '$state', 'UserService', AlreadyLoggedInUser]);
})();
