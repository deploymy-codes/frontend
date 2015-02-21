require.register('deploy_my_codes/config/routes', function(exports, require, module){
  module.exports = function($stateProvider, $urlRouterProvider, RouteToolProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('authorize', RouteToolProvider.authorizeUser({
        url: '/authorize'
      }))
      .state('dashboard', RouteToolProvider.authenticatedAccessState({
        url:   '/dashboard',
        views: RouteToolProvider.loggedInViews('/dashboard')
      }))
      .state('add-project', RouteToolProvider.authenticatedAccessState({
        url:   '/add-project',
        views: RouteToolProvider.loggedInViews('/add-project')
      }));
  };
});
