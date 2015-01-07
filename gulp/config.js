var path = require('path')

var dest = './build'
var dist = './dist'
var src = './src'

var destAssets = path.join(dest, 'assets')
var destVendors = path.join(destAssets, 'vendors')
var destImages = path.join(destAssets, 'images')

var distVendors = path.join(dist, 'assets', 'vendors')

var nodeModules = './node_modules'
var bowerComponents = path.join(src, 'bower_components')

var dependencies = ['react', 'react-router', 'react-bootstrap', 'react-router-bootstrap']

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  copy: {
    bootstrap: {
      src: [bowerComponents + '/bootstrap/dist/**/*.*'],
      dest: {
        devMode: destVendors,
        production: distVendors
      }
    }
  },
  symlink: [
    {src: nodeModules, dest: dest},
    {src: src, dest: dest}
  ],
  sass: {
    src: src + '/sass/**/*.{sass,scss}',
    dest: destAssets,
    settings: {
      // Required if you want to use SASS syntax
      // See https://github.com/dlmanning/gulp-sass/issues/81
      sourceComments: 'map',
      includePaths: [bowerComponents],
      imagePath: '/assets/images' // Used by the image-url helper
    }
  },
  images: {
    src: src + '/images/**/*.*',
    dest: destImages
  },
  markup: {
    src: src + '/htdocs/*.html',
    dest: dest
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/app/index.js',
      dest: destAssets,
      transform: [
        ['reactify', {harmony: true}],
        ['envify']
      ],
      outputName: 'app.js',
      // Additional file extensions to make optional
      extensions: ['.js', '.jsx'],
      // list of modules to make require-able externally
      require: [],
      external: dependencies
    }, {
      dest: destAssets,
      transform: [
        'envify'
      ],
      outputName: 'vendors.js',
      require: dependencies
    }]
  },
  production: {
    htmlSrc: dest + '/*.html',
    dest: dist
  }
}
