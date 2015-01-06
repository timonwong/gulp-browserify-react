var gulp = require('gulp')
var config = require('../config').copy
var _ = require('lodash')
var browserSync = require('browser-sync')

var copyTasks = _.map(config, function (cfg, key) {
  // Create task name
  var taskName = '__task_copy_' + key
  var devMode = process.env.NODE_ENV !== 'production'
  // Create actual task
  gulp.task(taskName, function () {
    // Create actual task
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

  return taskName
})

gulp.task('copy', copyTasks)
