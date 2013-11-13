/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: {
        files: { src: ['Gruntfile.js', 'src/**/*.js'] },
        options: {
          jshintrc: '.jshintrc'
          // "-W033": true
          // node: true,
          // curly: false,
          // eqeqeq: false,
          // immed: true,
          // latedef: true,
          // newcap: true,
          // noarg: true,
          // sub: true,
          // undef: true,
          // boss: true,
          // eqnull: true,
          // browser: true,
          // asi: true,
          // devel: true
        }
      }
    }
  });

  // Default task.
  // put require before handlebars because require wipes the dir
  grunt.registerTask('default', ['jshint'])

  // load the grunt task plugins
  grunt.loadNpmTasks('grunt-contrib-jshint')
};
