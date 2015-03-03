require.register('deploy_my_codes/controllers/add_project_controller', function(exports, require, module) {
  module.exports = function($scope, OrganizationService, ProjectService, UserService, UserFeedbackService) {
    var bindOrganizations = function(organizations) {
      $scope.organizations = organizations;
    };

    var bindUser = function(user) {
      $scope.user = user;
    };

    var resetSelection = function() {
      _.each($scope.organizations, function(organization) { organization.selected = false });
      $scope.projects      = [];
      $scope.user.selected = false;
    };

    $scope.projects = [];

    $scope.importProject = function(project) {
      ProjectService.import(project).then(function(_) {
        project.imported = true;
        UserFeedbackService.success('Project ' + project.name + ' has been successfully imported.');
      });
    };

    $scope.selectOrganization = function(organization) {
      resetSelection();
      organization.selected = true;

      ProjectService.getProjectsforOrganization(organization).then(function(projects) {
        $scope.projects = projects;
      });
    };

    $scope.selectUser = function() {
      resetSelection();
      $scope.user.selected = true;

      ProjectService.getProjectsforUser().then(function(projects) {
        $scope.projects = projects;
      });
    };

    OrganizationService.getOrganizations().then(bindOrganizations);
    UserService.get().then(bindUser);
  };
});
