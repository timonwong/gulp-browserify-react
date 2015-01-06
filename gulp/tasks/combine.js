var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('../config').production
var handleErrors = require('../util/handleErrors')

gulp.task('combine', ['build', 'browserify'], function() {
  var assets = $.useref.assets()

  return gulp.src(config.htmlSrc)
    // Report compile errors
    .on('error', handleErrors)
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.js', $.size({title: 'Combined JS'})))
    .pipe($.if('*.css', $.minifyCss({keepBreaks: true})))
    .pipe($.if('*.css', $.size({title: 'Combined CSS'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(config.dest))
})
