var concat     = require('gulp-concat');
var merge      = require('merge-stream');
var gulp       = require('gulp');
var preprocess = require('gulp-preprocess');
var config     = require('../config').javascripts;

gulp.task('javascripts', function() {
  var createBundle = function(bundleConfig) {
    var common = gulp.src(config.commonjs.src);
    var javascripts = gulp.src(bundleConfig.src.javascripts)
                           .pipe(preprocess());

    return merge(common, merge(javascripts))
             .pipe(concat(bundleConfig.outputName))
             .pipe(gulp.dest(bundleConfig.dest));

  };

  config.bundleConfigs.forEach(createBundle);
});
