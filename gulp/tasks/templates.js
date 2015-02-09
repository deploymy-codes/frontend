var gulp   = require('gulp');
var jade   = require('gulp-jade');
var merge  = require('merge-stream');
var config = require('../config').templates;

gulp.task('templates', function() {
  var staticJadeTemplates = gulp.src(config.static.src)
                                .pipe(jade())
                                .pipe(gulp.dest(config.static.dest));

  var javascriptHTMLTemplates = gulp.src(config.javascript.src.html)
                                    .pipe(gulp.dest(config.javascript.dest));

  var javascriptJadeTemplates = gulp.src(config.javascript.src.jade)
                                    .pipe(jade())
                                    .pipe(gulp.dest(config.javascript.dest));

  return merge(staticJadeTemplates, merge(javascriptHTMLTemplates, javascriptJadeTemplates));
});
