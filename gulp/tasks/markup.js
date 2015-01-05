var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('../config').markup
var browserSync = require('browser-sync')

gulp.task('markup', function () {
  return gulp.src(config.src)
    .pipe($.useref())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}))
})