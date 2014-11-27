var commonjs   = require('gulp-wrap-commonjs');
var concat     = require('gulp-concat');
var merge      = require('merge-stream');
var gulp       = require('gulp');
var jade       = require('gulp-jade');
var preprocess = require('gulp-preprocess');
var config     = require('../config').javascripts;

gulp.task('javascripts', function() {
  var pathModifier = function (path) {
    path = path.replace(/.js$/, '');
    path = path.replace(/.jade$/, '');
    path = path.replace(/.*\/javascripts\//, '');
    path = path.replace(/.*\/bower_components\/.*\//, '');
    return path;
  };

  var createBundle = function(bundleConfig) {
    var common = gulp.src(config.commonjs.src);
    var templates = gulp.src(bundleConfig.src.templates)
                        .pipe(jade({ client: true }))
                        .pipe(commonjs({ pathModifier: pathModifier, moduleExports: 'template' }));
    var javascripts = gulp.src(bundleConfig.src.javascripts)
                           .pipe(preprocess());


    return merge(common, merge(javascripts, templates))
             .pipe(concat(bundleConfig.outputName))
             .pipe(gulp.dest(bundleConfig.dest));

  };

  config.bundleConfigs.forEach(createBundle);
});
