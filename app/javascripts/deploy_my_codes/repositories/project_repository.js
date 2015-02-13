require.register('deploy_my_codes/repositories/project_repository', function(exports, require, module) {
  module.exports = function($http, $q, APIHelper) {
    var listRemoteProjects = function() {
      var deferred = $q.defer();

      $http.get(APIHelper.buildURL('/users/remote_projects'))
        .success(function(data, _, _, _) { deferred.resolve(data); });

      return deferred.promise;
    };

    return {
      listRemoteProjects: listRemoteProjects
    }
  };
});
