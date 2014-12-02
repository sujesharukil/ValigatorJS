/*global module, require*/

module.exports = function (grunt) {
    'use strict';
    var bannerContent = '/*! <%= pkg.name%> v<%= pkg.version%> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
        'Author: <%= pkg.author%>';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: bannerContent,
            target: {
                src: ['src/prefix.tmp', 'src/validators/**/*.js', 'src/core-engine.js', 'src/configure.js', 'src/postfix.tmp'],
                dest: 'dist/validationEngine.js'
            }
        },

        jshint: {
            options: {
                eqeqeq: true,
                trailing: true,
                plusplus: true
            },
            target: {
                src: ['src/**/*.js']
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'concat']);

};