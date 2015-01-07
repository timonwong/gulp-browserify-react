var fs = require('fs')
var path = require('path')
var gulp = require('gulp')
var browserify = require('browserify')
var browserSync = require('browser-sync')
var watchify = require('watchify')
var bundleLogger = require('../util/bundleLogger')
var handleErrors = require('../util/handleErrors')
var source = require('vinyl-source-stream')
var mold = require('mold-source-map')
var config = require('../config').browserify
var _ = require('lodash')

var browserifyTask = function (callback) {
  var devMode = process.env.NODE_ENV !== 'production'
  var bundleQueue = config.bundleConfigs.length

  var browserifyThis = function (bundleConfig) {
    if (devMode) {
      // Add watchify args and debug (sourcemaps) option
      _.extend(bundleConfig, watchify.args, {debug: true})
    }

    // A watchify require/external bug that prevents proper recompiling,
    // so (for now) we'll ignore these options during development.
    var b = browserify(_.omit(bundleConfig, ['external', 'require']))
    // Sort out shared dependencies.
    // b.require exposes modules externally
    if (bundleConfig.require) {
      b.require(bundleConfig.require)
    }
    // b.external excludes modules from the bundle, and expects
    // they'll be available externally
    if (bundleConfig.external) {
      b.external(bundleConfig.external)
    }

    var bundle = function () {
      // Log when bundling starts
      bundleLogger.start(bundleConfig.outputName)

      var bundleStream = b.bundle()
        // Report compile errors
        .on('error', handleErrors)

      if (devMode) {
        var jsRoot = path.resolve('.')
        var mapFilePath = path.join(bundleConfig.dest, bundleConfig.outputName + '.map')
        var mapFileUrlCommentSync = function(sourcemap) {
          // Because reactify returns transformed sourcemap, here we add the hack to get around of it
          // Note that this should be used with symlink task
          sourcemap.sourceRoot('/')
          sourcemap.mapSources(mold.mapPathRelativeTo(jsRoot))
          sourcemap.file(bundleConfig.outputName)
          // Exclude sourcesContent, because we don't need it anymore
          sourcemap.sourcemap.setProperty('sourcesContent', undefined)

          // write map file and return a sourceMappingUrl that points to it
          fs.writeFileSync(mapFilePath, sourcemap.toJSON(2), 'utf-8')
          // Giving just a filename instead of a path will cause the browser to look for the map file
          // right next to where it loaded the bundle from.
          // Therefore this way the map is found no matter if the page is served or opened from the filesystem.
          return '//@ sourceMappingURL=' + path.basename(mapFilePath)
        }

        bundleStream = bundleStream.pipe(mold.transform(mapFileUrlCommentSync))
      }

      return bundleStream
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specify the
        // desired output filename here.
        .pipe(source(bundleConfig.outputName))
        // Specify the output destination
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', reportFinished)
        .pipe(browserSync.reload({stream: true}))
    }

    if (devMode) {
      // Wrap with watchify and rebundle on changes
      b = watchify(b)
      // Rebundle on update
      b.on('update', bundle)
      bundleLogger.watch(bundleConfig.outputName)
    }

    var reportFinished = function () {
      // Log when bundling completes
      bundleLogger.end(bundleConfig.outputName)

      if (bundleQueue) {
        bundleQueue--
        if (bundleQueue === 0) {
          // If queue is empty, tell gulp the task is complete.
          // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
          callback()
        }
      }
    }

    return bundle()
  }

  // Start bundling with Browserify for each bundleConfig specified
  config.bundleConfigs.forEach(browserifyThis)
}

gulp.task('browserify', browserifyTask)

// Exporting the task so we can call it directly in our watch task, with the 'devMode' option
module.exports = browserifyTask
