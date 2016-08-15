'use strict';

module.exports = function (grunt) {

  // Show elapsed time after tasks run to visualize performance
  require('time-grunt')(grunt);
  // Load all Grunt tasks that are listed in package.json automagically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // shell commands for use in Grunt tasks
    shell: {
      jekyllBuild: {
        command: 'jekyll build'
      },
      jekyllServe: {
        command: 'jekyll serve'
      }
    },

    ts: {
      default : {
        src: ["js/*.ts"],
        target: "es6"
      }
    },

    // watch for files to change and run tasks when they do
    watch: {
      sass: {
        files: ['_sass/**/*.{scss,sass}'],
        tasks: ['sass']
      },
      ts: {
        files: ['js/**/*.ts'],
        tasks: ['ts']
      }
    },

    // sass (libsass) config
    sass: {
      options: {
        sourceMap: true,
        relativeAssets: false,
        outputStyle: 'expanded',
        sassDir: '_sass',
        cssDir: '_site/css'
      },
      build: {
        files: [{
          expand: true,
          cwd: '_sass/',
          src: ['**/*.{scss,sass}'],
          dest: '_site/css',
          ext: '.css'
        }]
      }
    },

    

    // run tasks in parallel
    concurrent: {
      serve: [
        'sass',
        'ts',
        'watch',
        'shell:jekyllServe'
      ],
      options: {
        logConcurrentOutput: true
      }
    },

  });

  // Register the grunt serve task
  grunt.registerTask('serve', [
    'concurrent:serve'
  ]);

  // Register the grunt build task
  grunt.registerTask('build', [
    'ts',
    'shell:jekyllBuild',
    'sass'    
  ]);

  // Register build as the default task fallback
  grunt.registerTask('default', 'build');

  



};