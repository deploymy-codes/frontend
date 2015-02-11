require.register('deploy_my_codes/services/project_service', function(exports, require, module) {
  module.exports = function($q, ProjectRepository) {
    var getRemoteProjects = function() {
      return ProjectRepository.findRemoteProjects();
    };

    return {
      getRemoteProjects: getRemoteProjects
    }
  };
});
