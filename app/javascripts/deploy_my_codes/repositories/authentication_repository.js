require.register('deploy_my_codes/repositories/authentication_repository', function(exports, require, module) {
  module.exports = function($http, $q, APIHelper) {
    var registerUser = function(code) {
      var deferred = $q.defer();

      $http.post(APIHelper.buildURL('/auth/github'), { code: code })
        .success(function(data, _, _, _) { deferred.resolve(data); });

      return deferred.promise;
    }

    return {
      save: registerUser
    }
  }
});
