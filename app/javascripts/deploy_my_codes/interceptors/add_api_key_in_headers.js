require.register('deploy_my_codes/interceptors/add_api_key_in_headers_interceptor', function(exports, require, module) {
  module.exports = function($q, UserService) {
    var transformRequest = function(config) {
      var deferred = $q.defer();

      UserService.get().then(function(user) {
        if (user.isLoggedIn) config.headers['Authorization'] = user.api_key;

        deferred.resolve(config);
      });

      return deferred.promise;
    };

    return {
      request: transformRequest
    };
  };
});
