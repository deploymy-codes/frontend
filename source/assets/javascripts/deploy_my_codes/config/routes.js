(function() {
  var Routes = function($stateProvider, $urlRouterProvider, RouteToolProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('sign_up', RouteToolProvider.notAuthenticatedAccessState(RouteToolProvider.redirectAuthenticatedUserToApp({
        url: '/sign_up',
        views: RouteToolProvider.notLoggedInViews('/sign_up')
      })))
      .state('sign_in', RouteToolProvider.notAuthenticatedAccessState(RouteToolProvider.redirectAuthenticatedUserToApp({
        url: '/sign_in',
        views: RouteToolProvider.notLoggedInViews('/sign_in')
      })))
      .state('dashboard', RouteToolProvider.authenticatedAccessState({
        url:   '/dashboard',
        views: RouteToolProvider.loggedInViews('/dashboard')
      }));
  };

  angular.module('DeployMyCodes').config(['$stateProvider', '$urlRouterProvider', 'RouteToolProvider', Routes]);
})();
