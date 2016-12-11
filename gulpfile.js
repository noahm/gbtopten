var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var server = require('gulp-develop-server');
var mocha = require('gulp-mocha');

var serverTS = ["src/**/*.ts"];

gulp.task('ts', ['clean'], function() {
    return gulp
        .src(serverTS, {base: './src'})
        .pipe(ts({ module: 'commonjs', noImplicitAny: true, target: 'es6' }))
        .pipe(gulp.dest('./build'));
});

gulp.task('clean', function () {
    return gulp
        .src([
            'build/*',
        ], {read: false})
        .pipe(clean())
});

gulp.task('load:fixtures', function (cb) {
    var load = require('./fixtures/load');
    return load.loadData(cb);
});

gulp.task('server:start', ['ts'], function() {
    server.listen({path: 'bin/www'}, function(error) {
        console.log(error);
    });
});

gulp.task('server:restart', ['ts'], function() {
    server.restart();
});

gulp.task('default', ['server:start'], function() {
    gulp.watch(serverTS, ['server:restart']);
});

gulp.task('test', ['ts', 'load:fixtures'], function() {
    return gulp
        .src('test/*.js', {read: false})
        // wait for dev server to start properly :(
        //.pipe(wait(600))
        .pipe(mocha())
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });
});
