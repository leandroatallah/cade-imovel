var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	minifyCSS = require('gulp-csso'),
	autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  header = require('gulp-header'),
  footer = require('gulp-footer');


var fs = require('fs');
gulp.task('get-header-footer', function() {
  return gulp.src('./pages/*.html')
    .pipe(header(fs.readFileSync('./templates/header.html', 'utf8')))
    .pipe(footer(fs.readFileSync('./templates/footer.html', 'utf8')))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', './sass/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', './assets/js/*'])
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browserSync.stream());
});

gulp.task('imagemin', function() {
  return gulp.src('./assets/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: './dist'
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', './sass/**/*.scss'], gulp.series('sass'));
    gulp.watch(['./pages/*.html', './templates/*.html', './dist/*.html']).on('change', browserSync.reload);
    gulp.watch(['./pages/*.html', './templates/*.html', './dist/*.html']).on('change', gulp.series('get-header-footer', browserSync.reload));
    
}));

gulp.task('default', gulp.series('get-header-footer', 'imagemin', 'js', 'serve'));