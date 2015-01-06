var gulp = require('gulp')
var config = require('../config').copy
var merge = require('merge-stream')
var _ = require('lodash')
var browserSync = require('browser-sync')


gulp.task('copy', function () {
  var streams = []
  _.values(config).forEach(function (cfg) {
    var dest
    if (global.devMode) {
      dest = cfg.dest.devMode || cfg.dest
    } else {
      dest = cfg.dest.production || cfg.dest
    }

    var stream = gulp.src(cfg.src)
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({stream: true}))

    streams.push(stream)
  })
  return merge.apply(this, streams)
})
