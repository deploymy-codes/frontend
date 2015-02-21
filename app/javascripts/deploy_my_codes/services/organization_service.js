require.register('deploy_my_codes/services/organization_service', function(exports, require, module) {
  module.exports = function(OrganizationRepository) {
    var getOrganizations = function() {
      return OrganizationRepository.listOrganizations();
    };

    return {
      getOrganizations: getOrganizations
    };
  };
});
