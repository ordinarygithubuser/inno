var gulp = require('gulp');
var fs = require('fs');
var envify = require('envify/custom');
var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var sequence = require('gulp-sequence');
var nodemon = require('nodemon');
var browserSync = require('browser-sync');

var paths = {
	client: {
		main: './src/client/main.js',
		dist: './client/js/bundle.js',
		src:  './src/client/**/*.js'
	},
	server: {
		main: './server/app.js',
		dist: './server/',
		src:  './src/server/**/*.js'
	}
};

var conf = {
	browserify: {
		debug: true
	},
	babelify: {
		stage: 0,
		sourceMapRelative: 'C:\\Users\\alex\\workspace\\node\\inno-js'
		//sourceMapRelative: 'D:\\workspace_node\\inno'
	}
};

var globals = {
	ENV: process.env.NODE_ENV,
	DEV: process.env.NODE_ENV == 'development'
};

gulp.task('build:client', function () {
	return browserify(paths.client.main, conf.browserify)
		.transform(babelify.configure(conf.babelify))
        .transform(envify(globals))
        .bundle()
		.on('error', function (err) { console.log('Syntax Error : ' + err.message + ' (' + err.lineNumber + ')'); })
		.pipe(fs.createWriteStream(paths.client.dist));
});

gulp.task('build:server', function () {
	return gulp.src(paths.server.src)
		.pipe(babel({ stage: 0 }))
		.pipe(gulp.dest(paths.server.dist));
});

gulp.task('proxy', function () {
	gulp.watch(paths.client.src, function () {
		sequence('build:client', browserSync.reload);
	});
	gulp.watch(paths.server.src, function () {
		gulp.start('build:server');
	});

	return browserSync({
		proxy: {
			target: 'http://localhost:3000',
			ws: true
		},
		port: 2000,
		ghostMode: false,
		files: [
			'client/css/**',
			'client/img/**',
			'client/**/*.html'
		],
		scriptPath: function (path, port, options) {
			return options.get('absolute').replace('HOST', 'localhost');
		}
	});
});

gulp.task('nodemon', function (cb) {
	nodemon({
		script: paths.server.main,
		ignore: [
			'src/*',
			'client/*',
			'gulpfile.js',
			'package.json',
			'LICENSE',
			'README.md',
			'.gitignore'
		]
	});
	cb();
});

gulp.task('server', function (cb) {
	sequence('build:client', 'build:server', 'nodemon', 'proxy')(cb);
});

gulp.task('default', [ 'server' ]);