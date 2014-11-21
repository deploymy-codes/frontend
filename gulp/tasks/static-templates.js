var gulp   = require('gulp');
var jade   = require('gulp-jade');
var config = require('../config').static_templates;

gulp.task('static_templates', function() {
  return gulp.src(config.src)
             .pipe(jade())
             .pipe(gulp.dest(config.dest));
});
