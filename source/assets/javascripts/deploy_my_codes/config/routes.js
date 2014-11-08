(function() {
  var NotAuthenticatedAccessState = function(state) {
    return state;
  };

  var AuthenticatedAccessState = function(state) {
    authenticationRule = { data: { shouldBeRedirectedToSignIn: function(user) { return !user.isLoggedIn } }};
    return _.extend(authenticationRule, state);
  };

  var RedirectAuthenticatedUserToApp = function(state) {
    redirectionRule = { data: { shouldBeRedirectedToApp: function(user) { return user.isLoggedIn } }};
    return _.extend(redirectionRule, state);
  };

  var Routes = function($stateProvider, $urlRouterProvider) {
    var templatePath = function(name) {
      return ['$templates', '$stateParams', function($templates, $stateParams) {
        return $templates.get(name);
      }]
    };

    var LoggedInViews = function(templateName) {
      return {
        "application": { templateProvider: templatePath(templateName) },
        "menu":        { templateProvider: templatePath('/menu/authenticated') }
      };
    };

    var NotLoggedInViews = function(templateName) {
      return {
        "application":  { templateProvider: templatePath(templateName) },
        "menu":         { templateProvider: templatePath('/menu/not_authenticated') }
      };
    };

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('sign_up', NotAuthenticatedAccessState(RedirectAuthenticatedUserToApp({
        url: '/sign_up',
        views: NotLoggedInViews('/sign_up')
      })))
      .state('sign_in', NotAuthenticatedAccessState(RedirectAuthenticatedUserToApp({
        url: '/sign_in',
        views: NotLoggedInViews('/sign_in')
      })))
      .state('dashboard', AuthenticatedAccessState({
        url:   '/dashboard',
        views: LoggedInViews('/dashboard')
      }));
  };

  angular.module('DeployMyCodes').config(['$stateProvider', '$urlRouterProvider', Routes]);
})();
