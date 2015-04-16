(function () {
  "use strict";

  var gulp = require("gulp");
  var jshint = require("gulp-jshint");

  gulp.task("lint", function() {
    return gulp.src("src/js/*.js")
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"))
      .pipe(jshint.reporter("fail"));
  });

  gulp.task("lintHTML", function() {
    return gulp.src("rise-story.html")
      .pipe(jshint.extract("always"))
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"))
      .pipe(jshint.reporter("fail"));
  });

  // gulp.task("watch",function(){
  //   gulp.watch("src/*.html","src/js/*.js", ["lint"]);
  // });

  gulp.task("default", ["lint","lintHTML"]);
})();
