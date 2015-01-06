/* Notes:
 - gulp/tasks/browserify.js handles js recompiling with watchify
 - gulp/tasks/browserSync.js watches and reloads compiled files
 */

var gulp = require('gulp')
var config = require('../config')
var watchify = require('./browserify')
var _ = require('lodash')

gulp.task('watch', ['watchify', 'browserSync'], function () {
  var copySrcs = _.flatten(_.map(config.copy, function (cfg) {
    return cfg.src
  }))
  gulp.watch(copySrcs, ['copy'])

  gulp.watch(config.sass.src, ['sass'])
  gulp.watch(config.images.src, ['images'])
  gulp.watch(config.markup.src, ['markup'])
  // Watchify will watch and recompile our JS, so no need to gulp.watch it
})
