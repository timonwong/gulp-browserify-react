var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('../config').sass
var handleErrors = require('../util/handleErrors')
var browserSync = require('browser-sync')


var sassTask = function(callback, devMode) {
  return gulp.src(config.src)
    .pipe($.if(devMode, $.sourcemaps.init()))
    .pipe($.sass(config.settings))
    .on('error', handleErrors)
    .pipe($.if(devMode, $.sourcemaps.write()))
    .pipe($.autoprefixer({browsers: ['last 2 versions']}))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}))
}

gulp.task('sass', function (callback) {
  sassTask(callback, true)
})

gulp.task('sass-production', function (callback) {
  sassTask(callback, false)
})
