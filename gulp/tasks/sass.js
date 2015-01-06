var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('../config').sass
var handleErrors = require('../util/handleErrors')
var browserSync = require('browser-sync')


gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe($.if(global.devMode, $.sourcemaps.init()))
    .pipe($.sass(config.settings))
    .on('error', handleErrors)
    .pipe($.if(global.devMode, $.sourcemaps.write()))
    .pipe($.autoprefixer({browsers: ['last 2 versions']}))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}))
})
