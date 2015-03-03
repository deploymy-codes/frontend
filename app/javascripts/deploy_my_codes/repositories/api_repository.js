require.register('deploy_my_codes/repositories/api_repository', function(exports, require, module) {
  module.exports = function($http, $q, APIHelper) {
    var call = function(method, path, parameters) {
      var deferred   = $q.defer();
      var parameters = parameters || {};

      method(APIHelper.buildURL(path), parameters).success(function(data, _, _, _) {
        deferred.resolve(data);
      });

      return deferred.promise;
    };

    var get = function(path, parameters) {
      return call($http.get, path, parameters);
    };

    var post = function(path, parameters) {
      return call($http.post, path, parameters);
    };

    return {
      get:  get,
      post: post
    };
  };
});
