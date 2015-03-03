require.register('deploy_my_codes/middlewares/authorize_user', function(exports, require, module) {
  var _ = require('underscore');

  module.exports = function($rootScope, $state, $window, AuthenticationService) {
    var QueryParams = function() {
      var REGEX = /^([^=]+)=(.*)$/i;
      var raw_parameters = $window.location.search.slice(1);

      if (raw_parameters === "") return {};

      return _.reduce(raw_parameters.split('&'), function(params, param) {
        var matches = REGEX.exec(param);
        params[matches[1]] = matches[2];
        return params;
      }, {});
    };

    $rootScope.$on('$stateChangeStart', function(event, destinationState) {
      if (destinationState.data && !destinationState.data.authorizeUser) return;

      var GitHubCode = new QueryParams().code;

      AuthenticationService.authenticate(GitHubCode).then(function(user) {
        event.preventDefault();
        $window.location = '/application';
      });
    });
  };
});
