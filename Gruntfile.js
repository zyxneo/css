/*****************************************/

// Change this path to your destination:

var wwwRoot = '';
var buildPath = 'build';

// http://gruntjs.com/getting-started
// http://www.integralist.co.uk/posts/grunt-boilerplate.html

/*****************************************/

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    settings: {
      // Working paths
      wwwSource: 'source/',
      stylesSourceDir: 'source/styles/',

      // Distribution paths
      wwwRoot: wwwRoot,
      build: buildPath,
      cssDir: buildPath + '/styles/'
    },

    clean: {
      dist: '<%= settings.build %>'
    },

    sass: {
      options: {
        outputStyle: 'compressed' // Default: nested Values: nested, expanded, compact, compressed
      },
      dev: {
        options: {
          sourceComments: true,
          sourceMap: true,
          outputStyle: 'expanded'
        },
        files: [{
          expand: true,
          cwd: '<%= settings.stylesSourceDir %>',
          src: ['**/*.{scss,sass}'],
          dest: '<%= settings.cssDir %>',
          ext: '.css'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= settings.stylesSourceDir %>',
          src: ['**/*.{scss,sass}'],
          dest: '<%= settings.cssDir %>',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        map: {
          inline: false,
          annotation: true,
          sourcesContent: true
        },
        processors: [
          require('autoprefixer')({
            browsers: [
              //
              // Official browser support policy:
              // http://v4-alpha.getbootstrap.com/getting-started/browsers-devices/#supported-browsers
              //
              'Chrome >= 35', // Exact version number here is kinda arbitrary
              // Rather than using Autoprefixer's native "Firefox ESR" version specifier string,
              // we deliberately hardcode the number. This is to avoid unwittingly severely breaking the previous ESR in the event that:
              // (a) we happen to ship a new Bootstrap release soon after the release of a new ESR,
              //     such that folks haven't yet had a reasonable amount of time to upgrade; and
              // (b) the new ESR has unprefixed CSS properties/values whose absence would severely break webpages
              //     (e.g. `box-sizing`, as opposed to `background: linear-gradient(...)`).
              //     Since they've been unprefixed, Autoprefixer will stop prefixing them,
              //     thus causing them to not work in the previous ESR (where the prefixes were required).
              'Firefox >= 38', // Current Firefox Extended Support Release (ESR); https://www.mozilla.org/en-US/firefox/organizations/faq/
              // Note: Edge versions in Autoprefixer & Can I Use refer to the EdgeHTML rendering engine version,
              // NOT the Edge app version shown in Edge's "About" screen.
              // For example, at the time of writing, Edge 20 on an up-to-date system uses EdgeHTML 12.
              // See also https://github.com/Fyrd/caniuse/issues/1928
              'Edge >= 12',
              'Explorer >= 9',
              // Out of leniency, we prefix these 1 version further back than the official policy.
              'iOS >= 8',
              'Safari >= 8',
              // The following remain NOT officially supported, but we're lenient and include their prefixes to avoid severely breaking in them.
              'Android 2.3',
              'Android >= 4',
              'Opera >= 12'
            ]
          }),
          require('postcss-flexbugs-fixes')(),
          // require('cssnano')() // minify the result
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= settings.cssDir %>',
          src: ['**/*.css'],
          dest: '<%= settings.cssDir %>',
          ext: '.css'
        }]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      styles: {
        files: ['<%= settings.stylesSourceDir %>**/*.{scss,sass,css}'],
        tasks: ['sass:dev', 'postcss']
      },
    },
  })

  // CSS  distribution task.
  grunt.registerTask('styles', ['sass:dist', 'postcss']);

  // Build (Compile, dist, production) task
  grunt.registerTask('default', ['watch']);
}
