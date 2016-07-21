var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    sassGlob = require('gulp-sass-glob'),
    livereload = require('gulp-livereload');

// SASS for demo
gulp.task('demo-sass', function() {
  gulp.src('assets/styles/demo/scss/**/*.scss')
    .pipe(plumber({
        errorHandler: notify.onError("Sass Error: <%= error.message %>")}
    ))
    .pipe(sassGlob())
    .pipe(sass({
        outputStyle: 'compressed',
        sourceComments: false,
        includePaths: ['assets/styles/demo/scss'],
        errLogToConsole: true
    }))
    .pipe(gulp.dest('assets/styles/demo/'))
    .pipe(livereload());
});

// SASS for plugin
gulp.task('plugin-sass', function() {
  gulp.src('assets/styles/dist/**/*.scss')
    .pipe(plumber({
        errorHandler: notify.onError("Sass Error: <%= error.message %>")}
    ))
    .pipe(sassGlob())
    .pipe(sass({
        outputStyle: 'compressed',
        sourceComments: false,
        includePaths: ['assets/styles/dist'],
        errLogToConsole: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload());
});

gulp.task('serve', function(done) {
    var port = 4000;
    var express = require('express');
    var app = express();
    app.use(express.static(__dirname + '/'));
    app.listen(port, 'localhost', function () {
        done();
    });
    console.log('Site served on http://localhost:' + port)
});

gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(livereload());
});

gulp.task('img', function() {
    gulp.src(['assets/img/*.*'])
        .pipe(livereload());
});

// JS
gulp.task('demo-concat', function() {
    return gulp.src('assets/lib/demo/src/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .on('error', function errorHandler(error) {
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('assets/lib/demo/'))
});

gulp.task('dist-concat', function() {
    return gulp.src('assets/lib/dist/*.js')
        .pipe(concat('video-tracking.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .on('error', function errorHandler(error) {
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(rename('video-tracking.min.js'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function() {  
    gulp.watch('assets/styles/demo/**/*.scss', ['demo-sass']);
    gulp.watch('assets/styles/dist/**/*.scss', ['plugin-sass']);

    gulp.watch('assets/lib/demo/src/*.js', ['demo-concat']);
    gulp.watch('assets/lib/dist/*.js', ['dist-concat']);
    gulp.watch('*.html', ['html']);
    gulp.watch('assets/img/*.*', ['img']);

    livereload.listen();
});

gulp.task('default', ['watch', 'serve']);
