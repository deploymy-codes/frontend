require.register('deploy_my_codes/helpers/api_helper', function(exports, require, module) {
  module.exports = function(config) {
    return {
      buildURL: function(path) { return config.api.rootURL + path; }
    };
  };
});
