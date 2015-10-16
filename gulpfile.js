var gulp = require('gulp');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 2 versions']}),
        mqpacker,
        csswring
    ];
    return gulp.src('./src/madtaras-toast.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./lib'));
});

var uglify = require('gulp-uglify');

gulp.task('js', function() {
  return gulp.src('./src/madtaras-toast.js')
    .pipe(uglify())
    .pipe(gulp.dest('./lib'));
});