var gulp = require('gulp')

// Run this to compress all the things
gulp.task('production', ['copy', 'sass', 'images', 'markup', 'combine'])
