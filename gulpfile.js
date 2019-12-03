const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('hello', function(done) {
 console.log('Привет, мир!');
 done('');
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch("./*.html").on('change', browserSync.reload);
});


gulp.task('minify-css', () => {
  return gulp.src(['src/css/.css', '!src/css/.min.css'])
    .pipe(cleanCSS())
    .pipe(gulp.dest('/out/'))
});

 