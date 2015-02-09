require.register('deploy_my_codes/providers/route_tool_provider', function(exports, require, module){
  module.exports = function() {
    var _ = require('underscore');

    var templatePath = function(name) {
      return name + '.html';
    };

    var AuthenticatedAccessState = function(state) {
      var authenticationRule = { data: { shouldBeRedirectedToSignIn: function(user) { return !user.isLoggedIn; } }};
      return _.extend(authenticationRule, state);
    };

    var AuthorizedUser = function(state) {
      var authorizationRule = { data: { authorizeUser: true } }
      return _.extend(authorizationRule, state);
    };

    var LoggedInViews = function(templateName) {
      return {
        "application": { templateUrl: templatePath(templateName) },
        "menu":        { templateUrl: templatePath('/menu/authenticated') }
      };
    };

    return {
      authenticatedAccessState: AuthenticatedAccessState,
      authorizeUser: AuthorizedUser,
      loggedInViews: LoggedInViews,
      $get: function() {}
    };
  };
});
