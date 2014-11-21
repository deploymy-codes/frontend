require.register('deploy_my_codes/middlewares/already_logged_in_user', function(exports, require, module){
  module.exports = function($rootScope, $state, UserService) {
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
});
