require.register('deploy_my_codes/controllers/add_project_controller', function(exports, require, module){
  module.exports = function($scope, OrganizationService, ProjectService, UserService) {
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
