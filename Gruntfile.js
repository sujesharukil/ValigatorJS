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
                src: ['src/prefix.tpl', 'src/validators/**/*.js', 'src/core-engine.js', 'src/configure.js', 'src/postfix.tpl'],
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
        },

        mocha_phantomjs: {
            all: ['tests/harness.html']
        }
    });

    grunt.registerTask('default', ['jshint', 'concat', 'mocha_phantomjs']);

};