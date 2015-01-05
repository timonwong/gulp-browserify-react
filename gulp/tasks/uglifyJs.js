var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('../config').production

gulp.task('uglifyJs', ['browserify'], function () {
  return gulp.src(config.jsSrc)
    .pipe($.uglify())
    .pipe(gulp.dest(config.dest))
    .pipe($.size())
})
