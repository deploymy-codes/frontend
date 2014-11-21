var gulp   = require('gulp');
var karma  = require('karma').server;
var config = require('../config').tests;

gulp.task('tdd', function(done) {
  karma.start({
    configFile: config.configFile,
  }, done);
});
