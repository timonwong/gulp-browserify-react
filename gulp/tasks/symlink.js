var path = require('path')
var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('../config').symlink
var _ = require('lodash')

gulp.task('symlink', function() {
  var linkSrc = []
  var linkDest = []

  _.forEach(config, function(cfg) {
    var src = cfg.src
    var dest = path.join(cfg.dest, path.basename(src))
    linkSrc.push(src)
    linkDest.push(dest)
  })

  return gulp.src(linkSrc)
    .pipe($.symlink(linkDest, {force: true}))
})
