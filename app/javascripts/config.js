require.register('config', function(exports, require, module){
  module.exports = function() {
    var environment = /* @echo GULP_ENV */ || 'development';

    return {
      development: {
        github: {
          client_id: 'da3c2c42130e5391041f',
          api_authentication_url: 'http://localhost:9292/auth?provider=github'
        }
      },
      production:  {},
      test:        {}
    }[environment];
  };
});
