var gulp = require('gulp')
var config = require('../config').copy
var merge = require('merge-stream')
var _ = require('lodash')
var browserSync = require('browser-sync')

gulp.task('copy', function() {
  var devMode = process.env.NODE_ENV !== 'production'
  var streams = _.map(config, function (cfg) {
    var dest
    if (devMode) {
      dest = cfg.dest.devMode || cfg.dest
    } else {
      dest = cfg.dest.production || cfg.dest
    }
    return gulp.src(cfg.src)
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({stream: true}))
  })
  return merge.apply(this, streams)
})
