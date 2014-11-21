require.register('deploy_my_codes/config/oauth', function(exports, require, module){
  module.exports = function($authProvider, config) {
    $authProvider.tokenName     = 'api_key';
    $authProvider.tokenPrefix   = 'deploy_my_codes';
    $authProvider.github({
      clientId: config.github.client_id,
      url:      config.github.api_authentication_url
    });
  };
});
