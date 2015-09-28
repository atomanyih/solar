var gulp = require('gulp');
var rename = require('gulp-rename');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');

gulp.task('build-js', function() {
 return gulp.src('js/app.js')
   .pipe(webpack({
   module: {
     loaders: [
       {
         test: /\.js$/,
         exclude: /node_modules/,
         loader: 'babel-loader?stage=0&optional[]=runtime&loose=true&nonStandard=true'
       },
     ],
   },
 }))
 .pipe(rename('app.js'))
 .pipe(gulp.dest('dist/'));
});

gulp.task('setup-watchers', function(callback) {
  process.env.WEBPACK_WATCH = true;
  gulp.watch(['js/**/*'], ['build-js']);
  callback();
});
gulp.task('webserver', ['build-js'], function() {
 connect.server();
});

gulp.task('default', ['setup-watchers', 'webserver']);