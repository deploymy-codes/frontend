require.register('deploy_my_codes/controllers/remote_projects_controller', function(exports, require, module){
  module.exports = function($scope, ProjectService) {
    var bindProjects = function(projects) {
      $scope.projects = projects;
    };

    ProjectService.getRemoteProjects().then(bindProjects);
  };
});
