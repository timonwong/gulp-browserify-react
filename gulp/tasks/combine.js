var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('../config').production

gulp.task('combine', ['browserify'], function() {
  var assets = $.useref.assets()

  return gulp.src(config.htmlSrc)
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.js', $.size({title: 'Combined JS'})))
    .pipe($.if('*.css', $.minifyCss({keepBreaks: true})))
    .pipe($.if('*.css', $.size({title: 'Combined CSS'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(config.dest))
})
