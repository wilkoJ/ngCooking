module.exports = function(grunt) {

  // Project configuration.
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	msbuild: {
        dev: {
            src: ['build/ngCooking/ngCooking.csproj'],
            options: {
                version: 4.0,
                maxCpuCount: 4,
                buildParameters: {
                    WarningLevel: 2
                },
                customArgs:[ '/noautoresponse', '/detailedsummary'],
                verbosity: 'quiet'
            }
        }
    },
	copy: {
		main: {
			files: [
				{expand: true, src: ['**'], dest: 'build/'}
			],
		},
	},
	clean: {
		all: ['build/**/*'],
		js: ['build/ngCooking/**/*.js'],
		css:['build/ngCooking/**/*.css']
	},
	concat: {
		options: {
		},
		dist: {
		  src: ['ngCooking/ngCooking-master/**/*.js'],
		  dest: 'build/ngCooking/ngCooking-master/js/ngcooking.js',
		},
	},
	concat_css: {
		options: {
			// Task-specific options go here.
		},
		all: {
		  src: ["ngCooking/ngCooking-master/**/*.css"],
		  dest: "build/ngCooking/ngCooking-master/css/styles.css"
		},
	},
	uglify: {
		options: {
		},
		build: {
			src: 'build/ngCooking/ngCooking-master/js/ngcooking.js',
			dest: 'build/ngCooking/ngCooking-master/js/ngcooking.min.js'
		}
	},
	cssmin: {
		options:{
			processImport: false
		},
		target: {
			files: [{
			  expand: true,
			  cwd: 'build/ngCooking/ngCooking-master/css',
			  src: ['styles.css'],
			  dest: 'build/ngCooking/ngCooking-master/css',
			  ext: '.min.css'
			}]
		}
	},
	processhtml: {
        build: {
            files: {
                'build/ngCooking/ngCooking-master/main.html' : ['build/ngCooking/ngCooking-master/main.html']
            }
        }
    },
	compress: {
		main: {
			options: {
			archive: 'archive.zip'
		},
			files:[
			{src: ['build/**'], dest: './'}, // includes files in path and its subdirs
			]
		}
	}
});

  // Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-msbuild');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	// Default task(s).
	grunt.registerTask('default', ['clean:all','copy','clean:js','clean:css','concat','concat_css','uglify','cssmin','processhtml','msbuild','compress']);

};