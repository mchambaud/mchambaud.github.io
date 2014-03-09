module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: 'components',
        build: '_build',
        site: '_site',
        assets: {
            css: {
                vendor: [
                    '<%= bower %>/skeleton/stylesheets/base.css',
                    '<%= bower %>/skeleton/stylesheets/layout.css',
                    '<%= bower %>/skeleton/stylesheets/skeleton.css'
                ],

                src: [
                    '/css/*.css'
                ]
            },
            js: {
                vendor: [
                ],

                src: [
                ]
            }
        },
        
        clean: {
            src: ['<%= build %>']
        },
        
        copy: {
            jekyll: {
                expand: true,
                src: ['_config.yml', '_posts/*', '_layouts/*'],
                dest: '<%= build %>/'
            },
            
            
            vendor: {
                flatten: true,
                expand: true,
                src: '<%= assets.css.vendor %>',
                dest: '<%= build %>/css/vendor/'
            }
        },
        
        sass: {
            dist: {
                files: [{
                    expand: true,
                    src: ['css/*.scss'],
                    dest: '<%= build %>',
                    ext: '.css'
                }]
            }
        },
        
        jekyll: {
            dist: {
                options: {
                    src: '<%= build %>',
                    dest: '<%= _site %>',
                    config: '_config.yml'
                }
            }
        },
        
        tags: {
            dist: {
                options: {
                    scriptTemplate: '<script src="{{ path }}"></script>',
                    linkTemplate: '<link href="{{ path }}"/>',
                    openTag: '<!-- start template tags -->',
                    closeTag: '<!-- end template tags -->'
                },
                src: [
                    '<%= build %>/css/**/*.css',
                    '<%= build %>/scripts/**/*.js'
                ],
                dest: '<%= build %>/_layouts/default.html'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-script-link-tags');
    
    grunt.registerTask('default', ['clean', 'copy', 'sass', 'tags']);
    


};