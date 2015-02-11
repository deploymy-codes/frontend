require.register('config', function(exports, require, module){
  module.exports = function() {
    var _ = require('underscore');
    var environment = /* @echo GULP_ENV */ || 'development';

    return {
      development: {
        api: {
          rootURL: 'http://localhost:5000'
        }
      },
      production:  {},
      test:        {}
    }[environment];
  };
});
