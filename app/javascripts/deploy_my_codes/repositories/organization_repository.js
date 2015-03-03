require.register('deploy_my_codes/repositories/organization_repository', function(exports, require, module) {
  module.exports = function(API) {
    var listOrganizations = function() {
      return API.get('/users/orgs');
    };

    return {
      listOrganizations: listOrganizations
    };
  };
});
