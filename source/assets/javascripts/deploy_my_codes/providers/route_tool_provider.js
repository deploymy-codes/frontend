(function() {
  var RouteToolProvider = function() {
    var templatePath = function(name) {
      return ['$templates', '$stateParams', function($templates, $stateParams) {
        return $templates.get(name);
      }]
    };

    var AuthenticatedAccessState = function(state) {
      authenticationRule = { data: { shouldBeRedirectedToSignIn: function(user) { return !user.isLoggedIn } }};
      return _.extend(authenticationRule, state);
    };

    var LoggedInViews = function(templateName) {
      return {
        "application": { templateProvider: templatePath(templateName) },
        "menu":        { templateProvider: templatePath('/menu/authenticated') }
      };
    };

    var NotAuthenticatedAccessState = function(state) {
      return state;
    };

    var NotLoggedInViews = function(templateName) {
      return {
        "application":  { templateProvider: templatePath(templateName) },
        "menu":         { templateProvider: templatePath('/menu/not_authenticated') }
      };
    };

    var RedirectAuthenticatedUserToApp = function(state) {
      redirectionRule = { data: { shouldBeRedirectedToApp: function(user) { return user.isLoggedIn } }};
      return _.extend(redirectionRule, state);
    };

    return {
      authenticatedAccessState: AuthenticatedAccessState,
      notAuthenticatedAccessState: NotAuthenticatedAccessState,
      loggedInViews: LoggedInViews,
      notLoggedInViews: NotLoggedInViews,
      redirectAuthenticatedUserToApp: RedirectAuthenticatedUserToApp,
      $get: function() {}
    };
  };

  angular.module('DeployMyCodes').provider('RouteTool', RouteToolProvider);
})();
