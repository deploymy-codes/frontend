var gulp   = require('gulp');
var config = require('../config').fonts;

gulp.task('fonts', function() {
  return gulp.src([config.bowerSrc + '/font-awesome/fonts/**.*', config.src])
             .pipe(gulp.dest(config.dest));
});
