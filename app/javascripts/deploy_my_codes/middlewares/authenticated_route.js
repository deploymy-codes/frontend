require.register('deploy_my_codes/middlewares/authenticated_route', function(exports, require, module){
  module.exports = function($rootScope, $state, UserService) {
    $rootScope.$on('$stateChangeStart', function(event, destinationState) {
      if (!destinationState.data || !angular.isFunction(destinationState.data.shouldBeRedirectedToSignIn)) return;
      UserService.get().then(function(user) {
        var shouldBeRedirectedToSignIn = destinationState.data.shouldBeRedirectedToSignIn(user);

        if (shouldBeRedirectedToSignIn) {
          event.preventDefault();
          location.href = '/'
        }
      });
    });
  };
});
