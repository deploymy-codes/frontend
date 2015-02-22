require.register('config', function(exports, require, module){
  module.exports = function() {
    var _ = require('underscore');
    var environment = '/* @echo GULP_ENV */' == 'undefined' ? 'development' : '/* @echo GULP_ENV */';

    return {
      development: {
        api: {
          rootURL: 'http://dev.api.deploymy.codes:9292'
        }
      },
      production:  {},
      test: {
        api: {
          rootURL: 'http://test.api.deploymy.codes:9292'
        }
      }
    }[environment];
  };
});
