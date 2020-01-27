const {
  src,
  dest,
  watch,
  series
} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
// const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');
let uglify = require('gulp-uglify-es').default;


// Static server
function bs() {
  serveSass()
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./sass/**/*.sass").on('change', serveSass);
  watch("./sass/**/*.sсss").on('change', serveSass);
  watch("./js/*.js").on('change', browserSync.reload);
};

function serveSass() {
  return src("./sass/**/*.sass", "./sass/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(dest("./css"))
    .pipe(browserSync.stream());
};

function buildCSS() {
  return src(["src/css/**/*.css", "!src/css/**/.min.*"])
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    // .pipe(rename({suffix: 'min'}))
    .pipe(dest("dist/src/css/"));
};

function html() {
  return src('**.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist/'));
};

function JS() {
  return src(['src/js/**.js', '!src/js/**.min.js'])
    .pipe(uglify())
    .pipe(dest('dist/src/js/')),
    src('src/js/**.min.js')
    .pipe(dest('dist/src/js/'));
};

function php() {
  return src(['**.php'])
    .pipe(dest('dist/')),

    src('src/phpmailer/**/**')
    .pipe(dest('dist/src/phpmailer/'));
};

function fonts() {
  return src('src/fonts/**/**')
    .pipe(dest('dist/src/fonts'));
};

function imagemin() {
  return src('src/img/**/**{png,jpeg,jpg}')
    .pipe(tinypng({
      key: 'Zt1G6LS1W8KFMBkRQtR69qlKBcSrqrB3'
    }))
    .pipe(dest('dist/src/img/')),
    src('src/img/**/*.svg')
    .pipe(dest('dist/src/img/'));
};

exports.serve = bs;
exports.build = series(buildCSS, html, JS, php, fonts, imagemin);