require.register('config', function(exports, require, module){
  module.exports = function() {
    var _ = require('underscore');
    var environment = /* @echo GULP_ENV */ || 'development';

    return {
      development: {
        github: {
          apiAuthenticationURL: 'http://localhost:5000/auth/github'
        }
      },
      production:  {},
      test:        {}
    }[environment];
  };
});
