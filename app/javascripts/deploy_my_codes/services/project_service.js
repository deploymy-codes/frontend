require.register('deploy_my_codes/services/project_service', function(exports, require, module) {
  module.exports = function(ProjectRepository) {
    var getProjectsforOrganization = function(organization) {
      return ProjectRepository.listProjectsForOrganizationName(organization.name);
    };

    var getProjectsforUser = function() {
      return ProjectRepository.listProjectsForUser();
    };

    var importProject = function(project) {
      return ProjectRepository.importRemoteProjectByOwnerAndName(project.owner, project.name);
    };

    return {
      getProjectsforOrganization: getProjectsforOrganization,
      getProjectsforUser:         getProjectsforUser,
      import:                     importProject
    };
  };
});
