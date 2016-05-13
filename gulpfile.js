/**
 * Created by wungcq on 16/5/13.
 */
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
  return gulp.src('./src/spider/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./src/spider/compiled'));
});
