const gulp = require('gulp')
const merge = require('merge-stream')

const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const uglify = require('gulp-uglify')

const AUTOPREFIXER_BROWSERS = [
  'iOS >= 7',
  'Android >= 4',
  'ChromeAndroid >= 40',
  'FirefoxAndroid >= 40'
]

gulp.task('default', () => {
  gulp.watch('src/**', ['release'])
})

gulp.task('release', () => {
  'use strict'

  let jsFiles = gulp.src('src/materialToast.js')
    .pipe(uglify({'mangle': false}))
    .pipe(gulp.dest('./dist'))

  let cssFiles = gulp.src('src/materialToast.css')
    .pipe(autoprefixer({
      'browsers': AUTOPREFIXER_BROWSERS
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist'))

  return merge(jsFiles, cssFiles)
})
