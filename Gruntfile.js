'use strict';

var LIVERELOAD_PORT = 35729,
    SERVER_PORT = 9000,
    lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT }),
    mountFolder = function (connect, dir) {
      return connect.static(require('path').resolve(dir));
    };

module.exports = function(grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var appConfig = {
    dir: 'app'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: appConfig,
    watch: {
      options: {
        livereload: LIVERELOAD_PORT
      },
      sass: {
        files: ['<%= config.dir %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:app']
      },
      livereload: {
        files: [
          '<%= config.dir %>/*.html',
          '<%= config.dir %>/styles/{,*/}*.css',
          '<%= config.dir %>/scripts/{,*/}*.js'
        ]
      }
    },
    connect: {
      options: {
        port: SERVER_PORT,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              lrSnippet,
              mountFolder(connect, appConfig.dir)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.dir %>/scripts/{,*/}*.js',
        '!<%= config.dir %>/scripts/vendor/*'
      ]
    },
    sass: {
      options: {
        sourceMap: true,
        includePaths: ['<%= config.dir %>/bower_components']
      },
      app: {
        files: [{
          expand: true,
          cwd: '<%= config.dir %>/styles',
          src: ['*.{scss,sass}'],
          dest: '<%= config.dir %>/styles',
          ext: '.css'
        }]
      }
    },
    requirejs: {
      options: {
        baseUrl: '<%= config.dir %>/scripts',
        optimize: 'none',
        paths: {
          'jquery': '../../<%= config.dir %>/bower_components/jquery/dist/jquery',
          'underscore': '../../<%= config.dir %>/bower_components/lodash/dist/lodash',
          'backbone': '../../<%= config.dir %>/bower_components/backbone/backbone'
        },
        preserveLicenseComments: false,
        useStrict: true
      }
    },
    bower: {
      all: {
        rjsConfig: '<%= config.dir %>/scripts/main.js'
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: '<%= config.dir %>/scripts/',
          outdir: '<%= config.dir %>/docs/'
        }
      }
    }
  });

  grunt.registerTask('build', ['sass:app', 'yuidoc', 'requirejs']);

  grunt.registerTask('serve', ['connect:livereload', 'open:server', 'watch']);

  grunt.registerTask('default', ['jshint', 'build', 'serve']);
};
