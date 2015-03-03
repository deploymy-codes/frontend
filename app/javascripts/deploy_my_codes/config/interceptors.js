require.register('deploy_my_codes/config/interceptors', function(exports, require, module) {
  module.exports = function($httpProvider) {
    $httpProvider.interceptors.push('AddApiKeyInHeadersInterceptor');
  };
});
