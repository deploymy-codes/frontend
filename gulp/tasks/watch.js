var gulp   =  require('gulp');
var config = require('../config');

gulp.task('watch', ['browserSync'], function() {
  config.javascripts.bundleConfigs.forEach(function(bundleConfig) {
    gulp.watch(bundleConfig.src.javascripts, ['javascripts']);
  });
  gulp.watch(config.stylesheets.src,               ['stylesheets']);
  gulp.watch(config.images.src,                    ['images']);
  gulp.watch(config.fonts.src,                     ['fonts']);
  gulp.watch(config.templates.static.src,          ['templates']);
  gulp.watch(config.templates.javascript.src.jade, ['templates']);
  gulp.watch(config.templates.javascript.src.html, ['templates']);
});
