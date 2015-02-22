require.register('deploy_my_codes/repositories/project_repository', function(exports, require, module) {
  module.exports = function($http, $q, APIHelper) {
    var listProjectsForOrganizationName = function(organizationName) {
      var deferred = $q.defer();

      $http.get(APIHelper.buildURL('/users/orgs/' + organizationName + '/remote_projects'))
        .success(function(data, _, _, _) { deferred.resolve(data); });

      return deferred.promise;
    };

    var listProjectsForUser = function() {
      var deferred = $q.defer();

      $http.get(APIHelper.buildURL('/users/remote_projects'))
        .success(function(data, _, _, _) { deferred.resolve(data); });

      return deferred.promise;
    };


    var importRemoteProjectByName = function(name) {
      var deferred = $q.defer();

      $http.post(APIHelper.buildURL('/users/remote_projects/' + name + '/import'))
        .success(function(data, _, _, _) { deferred.resolve(data); });

      return deferred.promise;
    };

    return {
      importRemoteProjectByName:       importRemoteProjectByName,
      listProjectsForOrganizationName: listProjectsForOrganizationName,
      listProjectsForUser:             listProjectsForUser
    }
  };
});
