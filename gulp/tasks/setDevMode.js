var gulp = require('gulp')

gulp.task('setDevMode', function (callback) {
  global.devMode = true
  callback()
})
