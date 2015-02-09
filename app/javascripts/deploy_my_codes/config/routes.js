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
      .state('remote-projects', RouteToolProvider.authenticatedAccessState({
        url:   '/remote-projects',
        views: RouteToolProvider.loggedInViews('/remote_projects')
      }));
  };
});
