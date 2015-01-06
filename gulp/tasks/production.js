var gulp = require('gulp')

gulp.task('prepProduction', ['setProduction'])

// Run this to compress all the things
gulp.task('production', ['setProduction', 'combine'])
