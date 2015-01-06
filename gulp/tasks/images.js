var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('../config').images
var browserSync = require('browser-sync')

gulp.task('images', function () {
  return gulp.src(config.src)
    .pipe($.changed(config.dest)) // Ignore unchanged files
    .pipe($.imagemin()) // Optimize
    .pipe(gulp.dest(config.dest))
    //.pipe(browserSync.reload({stream: true}))
})
