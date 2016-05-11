// Include Gulp
var gulp = require('gulp');
var del  = require('del'); // rm -rf
var exec = require('child_process').exec;


// Include plugins
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Define default destination folder
var dest = 'build/';

// Clean build 
gulp.task('clean', function() {
    return del(dest);
});

// Concatenate own JS Files
gulp.task('js', function() {

	var jsFiles = ['src/js/*.js'];

	gulp.src(jsFiles)
		.pipe(concat('client.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dest + 'www/js'));

});

// Concatenate vendor JS Files
gulp.task('js-vendor', function() {

	gulp.src(plugins.mainBowerFiles())
		.pipe(plugins.concat('vendor.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(dest + 'www/js'));

});

// Concatenate own CSS Files
gulp.task('css', function() {

	var cssFiles = ['src/css/*.css'];

	gulp.src(cssFiles)
		.pipe(plugins.concat('style.css'))
		.pipe(gulp.dest(dest + 'www/css'));

});

// Copy Html Files
gulp.task('html', function() {

	var htmlFiles = ['src/*.html'];

	gulp.src(htmlFiles)
		.pipe(gulp.dest(dest + 'www'));

});

// Copy Server Files
gulp.task('server', function() {

	var htmlFiles = ['src/server.js', 'src/config.json'];

	gulp.src(htmlFiles)
		.pipe(gulp.dest(dest));

});

// Install Task
gulp.task('install', ['js', 'js-vendor', 'css', 'html', 'server']);

// Local Development Task
gulp.task('run', ['install'], function(callback) {

	var options = {
		cwd: 'build'	
	};
	
	exec('node', ['server.js'], options, function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		callback(err);
	});
});

// Default Task
gulp.task('default', ['install']);