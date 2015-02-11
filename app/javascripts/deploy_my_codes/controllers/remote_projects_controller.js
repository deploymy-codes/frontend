require.register('deploy_my_codes/controllers/remote_projects_controller', function(exports, require, module){
  module.exports = function($scope, $state) {
    $scope.projects = [{ name: 'deploymy-codes/frontend' },{ name: 'deploymy-codes/api' },{ name: 'arenaflowers/arena_apps' }];
  };
});
