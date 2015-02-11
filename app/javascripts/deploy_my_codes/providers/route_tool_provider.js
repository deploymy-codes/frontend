require.register('deploy_my_codes/providers/route_tool_provider', function(exports, require, module){
  module.exports = function() {
    var _ = require('underscore');

    var templatePath = function(name) {
      return name;
    };

    var AuthenticatedAccessState = function(state) {
      var authenticationRule = { data: { shouldBeRedirectedToSignIn: function(user) { return !user.isLoggedIn; } }};
      return _.extend(authenticationRule, state);
    };

    var LoggedInViews = function(templateName) {
      return {
        "application": { templateUrl: templatePath(templateName) },
        "menu":        { templateUrl: templatePath('/menu/authenticated') }
      };
    };

    var NotAuthenticatedAccessState = function(state) {
      return state;
    };

    var NotLoggedInViews = function(templateName) {
      return {
        "application":  { templateUrl: templatePath(templateName) },
        "menu":         { templateUrl: templatePath('/menu/not_authenticated') }
      };
    };

    var RedirectAuthenticatedUserToApp = function(state) {
      var redirectionRule = { data: { shouldBeRedirectedToApp: function(user) { return user.isLoggedIn; } }};
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
});
