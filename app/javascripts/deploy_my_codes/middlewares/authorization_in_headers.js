require.register('deploy_my_codes/middlewares/authorization_in_headers', function(exports, require, module){
  module.exports = function($auth, $injector) {
    $injector.get('$http').defaults.transformRequest = function(data, headersGetter) {
      if ($auth.getToken()) headersGetter()['Authorization'] = $auth.getToken();
      if (data) return angular.toJson(data);
    };
  };
});
