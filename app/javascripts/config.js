require.register('config', function(exports, require, module){
  module.exports = function() {
    var _ = require('underscore');
    var environment = /* @echo GULP_ENV */ || 'development';

    return {
      development: {
        api: {
          tokenName: 'api_key',
        },
        github: {
          clientId: 'da3c2c42130e5391041f',
          apiAuthenticationURL: 'http://localhost:9292/auth?provider=github'
        },
        session: {
          prefix: 'deploy_my_codes'
        }
      },
      production:  {},
      test:        {}
    }[environment];
  };
});
