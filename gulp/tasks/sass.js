var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('../config').sass
var handleErrors = require('../util/handleErrors')
var browserSync = require('browser-sync')


gulp.task('sass', function () {
  var devMode = process.env.NODE_ENV !== 'production'

  return gulp.src(config.src)
    .on('error', handleErrors)
    .pipe($.if(devMode, $.sourcemaps.init()))
    .pipe($.sass(config.settings))
    .pipe($.if(devMode, $.sourcemaps.write()))
    .pipe($.autoprefixer({browsers: ['last 2 versions']}))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}))
})
