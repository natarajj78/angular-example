module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		yeoman: {
			// configurable paths
			client: require('./bower.json').appPath || 'client',
			dist: 'dist'
		},
		includeSource: {
			options: {
				templates: {
			    html: {
		          js: '<script src="{filePath}"></script>',
		          css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
		        }
				}
			},
			myTarget: {
				files: {
					'index.html': 'myindex.html'
				}
			}
		},   // include source ends ...		
		watch:{
			scripts: {
				files: 'client-apps/**/*.js',
				tasks: ['jshint'],
				options:{
					debounceDelay:250
				}
			}
		},  // watch ends...
		jshint: {
    		all: ['client-apps/**/*.js']
  		},
	});  // end : initconfig...
	
	// Load the plugin that provides the "uglify" task.
  	//grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-watch');
  	// grunt.loadNpmTasks('grunt-contrib-concat');
  	grunt.loadNpmTasks('grunt-contrib-jshint');
  	// grunt.loadNpmTasks('grunt-contrib-sass');

	// Default task(s).
  	//grunt.registerTask('jstasks', ['uglify','includeSource', 'watch', 'jshint', 'sass']);
  	grunt.registerTask('default', ['includeSource', 'watch']);

};