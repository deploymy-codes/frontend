var gulp   =  require('gulp');
var config = require('../config');

gulp.task('watch', ['browserSync'], function() {
  config.javascripts.bundleConfigs.forEach(function(bundleConfig) {
    gulp.watch(bundleConfig.src.scopedJS,   ['javascripts']);
    gulp.watch(bundleConfig.src.unscopedJS, ['javascripts']);
    gulp.watch(bundleConfig.src.templates,  ['javascripts']);
  });
  gulp.watch(config.stylesheets.src,      ['stylesheets']);
  gulp.watch(config.images.src,           ['images']);
  gulp.watch(config.fonts.src,            ['fonts']);
  gulp.watch(config.static_templates.src, ['static_templates']);
});
