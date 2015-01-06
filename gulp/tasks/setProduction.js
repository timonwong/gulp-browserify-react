var gulp = require('gulp')

gulp.task('setProduction', function (callback) {
  process.env.NODE_ENV = 'production'
  callback()
})
