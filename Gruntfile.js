module.exports = function  (grunt) {
	
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({

		// Javascript Validator
		jshint: {
			all: ['app/scripts/**/*.js',
				'!app/scripts/vendor/**' ]
		},
		// Javascript Minifier Packer
		uglify: {
			options: {
				mangle: false
			},
			dist: {
				files: {
					//,'!app/scripts/vendor/**'
					'dist/scripts/app.js': [
						'app/scripts/app.js', 
						'app/scripts/**/*.js',
						'!app/scripts/vendor/**'
					]
				}
			}
		},
		// CSS Minifier Packer
		cssmin: {
			combine: {
				files: {
					'dist/css/style.css': ['app/css/**/*.css']
				}
			}
		},
		// Useful :)
		copy: {
		  main: {
		    files: [
		      // includes files within path
		      {expand: true, flatten: true, src: ['app/*'], dest: 'dist/', filter: 'isFile'},

		      // includes files within path and its sub-directories
		      {expand: true, src: ['app/scripts/vendor/**'],  dest: 'dist/scripts/vendor/'},
		      {expand: true, src: ['app/templates/**'], dest: 'dist/templates/'}

		      // makes all src relative to cwd
		      //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

		      // flattens results to a single level
		     // {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}
		    ]
		  }
		},
		// Require Packer
		requirejs: {
		  compile: {
		    options: {
		      	appDir: "./",
				baseUrl : "./app/scripts",
				dir: "./temp",
				mainConfigFile: "./app/scripts/app.js",
				name: "app",
				optimizeCss: "none",
				//fileExclusionRegExp: /^\.\/app\/scripts\/vendor/,
				preserveLicenseComments : false,
				fileExclusionRegExp: /^\./,
				removeCombined: false
				
		    }
		  }
		},
		watch: {
		    js: {                       // On jsHint et on minifie
		        files: ['app/scripts/**/*.js'],
		        //jshint plz
		        tasks: [ 'jshint'],
		        options: { spawn: false, livereload: true }
		    },
		    	/*   
		    less: {                   // On minifie le CSS
		        files: ['css/*.css'],
		        tasks: ['cssmin'],
		        options: { spawn: false, livereload: true }

		    },*/
		    css: {                      // On minifie le CSS
		        files: ['app/css/*.css'],
		        tasks: ['cssmin'],
		        options: { spawn: false, livereload: true }
		    }
		},
	});
	//jshint
	grunt.registerTask('default', ['cssmin', 'requirejs']);

}