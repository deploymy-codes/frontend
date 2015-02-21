require.register('deploy_my_codes/controllers/add_project_controller', function(exports, require, module){
  module.exports = function($scope, OrganizationService, ProjectService, UserService) {
    var bindOrganizations = function(organizations) {
      $scope.organizations = organizations;
    };

    var bindUser = function(user) {
      $scope.user = user;
    };

    $scope.projects = [];
    $scope.selectContext = function(context) {
      _.each($scope.organizations, function(organization) { organization.selected = false });
      $scope.projects      = [];
      $scope.user.selected = false;
      context.selected     = true;

      if (context.isLoggedIn === true) {
        loadUserProjects();
      } else {
        loadOrganizationProjects(context);
      }
    }

    var loadOrganizationProjects = function(organization) {
      ProjectService.getProjectsforOrganization(organization).then(function(projects) {
        $scope.projects = projects;
      });
    };

    var loadUserProjects = function() {
      ProjectService.getProjectsforUser().then(function(projects) {
        $scope.projects = projects;
      });
    }

    OrganizationService.getOrganizations().then(bindOrganizations);
    UserService.get().then(bindUser);
  };
});
