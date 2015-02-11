var bower      = require('gulp-bower');
var gulp       = require('gulp');
var sass       = require('gulp-ruby-sass');
var config     = require('../config').stylesheets;

gulp.task('stylesheets', ['fonts', 'images'], function () {
  return gulp.src(config.src)
             .pipe(sass({
               compass:    true,
               style:      'expanded',
               bundleExec: true,
               loadPath:   [
                 config.bowerSrc,
                 config.bowerSrc + '/foundation-apps/scss',
                 config.bowerSrc + '/font-awesome/scss',
               ]
             }))
             .pipe(gulp.dest(config.dest));
});
