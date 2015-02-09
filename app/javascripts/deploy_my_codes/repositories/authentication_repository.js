require.register('deploy_my_codes/repositories/authentication_repository', function(exports, require, module) {
  module.exports = function($http, $q, config) {
    var registerUser = function(code) {
      var deferred = $q.defer();

      $http.post(config.github.apiAuthenticationURL, { code: code })
        .success(function(data, _, _, _) { deferred.resolve(data); });

      return deferred.promise;
    }

    return {
      save: registerUser
    }
  }
});
