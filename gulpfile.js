var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	minifyCSS = require('gulp-csso'),
	autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  replace = require('gulp-replace');


var fs = require('fs');
gulp.task('get-header-footer', function() {
  return gulp.src('./pages/*.html')
    .pipe(replace('@_header', fs.readFileSync('./templates/header.html', 'utf8')))
    .pipe(replace('@_footer', fs.readFileSync('./templates/footer.html', 'utf8')))
    .pipe(replace('@_navigation', fs.readFileSync('./templates/navigation.html', 'utf8')))
    .pipe(replace('@_imovel', fs.readFileSync('./templates/imovel-item.html', 'utf8')))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'node_modules/slick-carousel/slick/slick.scss', './sass/**/*.scss'])
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
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/slick-carousel/slick/slick.js', 'node_modules/jquery/dist/jquery.min.js', './js/*'])
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browserSync.stream());
});

gulp.task('imagemin', function() {
  return gulp.src('./img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: './dist'
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', './sass/**/*.scss'], gulp.series('sass'));
    gulp.watch(['./img/*']).on('change', gulp.series('imagemin', browserSync.reload));
    gulp.watch(['./js/*.js']).on('change', gulp.series('js', browserSync.reload));
    gulp.watch(['./dist/*.html']).on('change', browserSync.reload);
    gulp.watch(['./pages/*.html', './templates/*.html']).on('change', gulp.series('get-header-footer'));
    
}));

gulp.task('default', gulp.series('get-header-footer', 'imagemin', 'js', 'serve'));