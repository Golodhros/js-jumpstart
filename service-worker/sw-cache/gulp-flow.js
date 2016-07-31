gulp.task('generate-sw', function() {
  var swOptions = {
    staticFileGlobs: [
      './index.html',
      './images/*.{png,svg,gif,jpg}',
      './scripts/*.js',
      './styles/*.css'
    ],
    stripPrefix: '.',
    runtimeCaching: [{
      urlPattern: /^https:\/\/publicdata-weather\.firebaseio\.com/,
      handler: 'networkFirst',
      options: {
        cache: {
          name: 'weatherData-v3'
        }
      }
    }]
  };
  return swPrecache.write('./service-worker.js', swOptions);
});

gulp.task('serve', ['generate-sw'], function() {
  gulp.watch('./styles/*.scss', ['sass']);
  browserSync({
    notify: false,
    logPrefix: 'weatherPWA',
    server: ['.'],
    open: false
  });
  gulp.watch([
    './*.html',
    './scripts/*.js',
    './styles/*.css',
    '!./service-worker.js',
    '!./gulpfile.js'
  ], ['generate-sw'], browserSync.reload);
});