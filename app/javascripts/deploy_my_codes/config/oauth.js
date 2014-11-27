require.register('deploy_my_codes/config/oauth', function(exports, require, module){
  module.exports = function($authProvider, config) {
    $authProvider.tokenName   = config.api.tokenName;
    $authProvider.tokenPrefix = config.session.prefix;
    $authProvider.github({
      clientId: config.github.clientId,
      url:      config.github.apiAuthenticationURL
    });
  };
});
