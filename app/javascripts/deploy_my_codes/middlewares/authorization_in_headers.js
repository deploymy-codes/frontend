require.register('deploy_my_codes/middlewares/authorization_in_headers', function(exports, require, module){
  module.exports = function($injector) {
    $injector.get('$http').defaults.transformRequest = function(data, headersGetter) {
      if (data) return angular.toJson(data);
    };
  };
});
