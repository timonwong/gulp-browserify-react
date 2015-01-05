var dest = './build'
var dist = './dist'
var src = './src'

var dependencies = ['react']

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  sass: {
    src: src + '/sass/**/*.{sass,scss}',
    dest: dest + '/styles',
    settings: {
      // Required if you want to use SASS syntax
      // See https://github.com/dlmanning/gulp-sass/issues/81
      sourceComments: 'map',
      includePaths: ['/bower_components'],
      imagePath: '/images' // Used by the image-url helper
    }
  },
  images: {
    src: src + '/images/**/*.*',
    dest: dest + '/images'
  },
  markup: {
    src: src + '/htdocs/**/*.html',
    dest: dest
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/app/main',
      dest: dest + '/scripts',
      transform: ['reactify'],
      outputName: 'app.js',
      // Additional file extensions to make optional
      extensions: ['.js', '.jsx'],
      // list of modules to make require-able externally
      require: [],
      external: dependencies
    }, {
      dest: dest + '/scripts',
      outputName: 'vendors.js',
      require: dependencies
    }]
  },
  production: {
    htmlSrc: dest + '/**/*.html',
    dest: dist
  }
}
