var gulp   = require('gulp');
var karma  = require('karma').server;
var config = require('../config').tests;

gulp.task('tests', function(done) {
  karma.start({
    configFile: config.configFile,
    singleRun:  true
  }, done);
});
