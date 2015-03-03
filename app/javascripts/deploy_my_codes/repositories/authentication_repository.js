require.register('deploy_my_codes/repositories/authentication_repository', function(exports, require, module) {
  module.exports = function(API) {
    var registerUser = function(code) {
      return API.post('/auth/github', { code: code });
    };

    return {
      save: registerUser
    };
  }
});
