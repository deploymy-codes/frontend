require.register('deploy_my_codes/repositories/project_repository', function(exports, require, module) {
  module.exports = function(API) {
    var importRemoteProjectByOwnerAndName = function(owner, name) {
      return API.post('/users/' + owner + '/remote_projects/' + name);
    };

    var listProjectsForOrganizationName = function(organizationName) {
      return API.get('/users/orgs/' + organizationName + '/remote_projects');
    };

    var listProjectsForUser = function() {
      return API.get('/users/remote_projects');
    };

    return {
      importRemoteProjectByOwnerAndName: importRemoteProjectByOwnerAndName,
      listProjectsForOrganizationName:   listProjectsForOrganizationName,
      listProjectsForUser:               listProjectsForUser
    }
  };
});
