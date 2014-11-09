(function() {
  var AuthenticatedRoute = function($rootScope, $state, UserService) {
    $rootScope.$on('$stateChangeStart', function(event, destinationState) {
      if (!destinationState.data || !angular.isFunction(destinationState.data.shouldBeRedirectedToSignIn)) return;
      UserService.get().then(function(user) {
        var shouldBeRedirectedToSignIn = destinationState.data.shouldBeRedirectedToSignIn(user);

        if (shouldBeRedirectedToSignIn) {
          event.preventDefault();
          $state.go('sign_in', {});
        }
      });
    });
  };

  angular.module('DeployMyCodes').run(['$rootScope', '$state', 'UserService', AuthenticatedRoute]);
})();
