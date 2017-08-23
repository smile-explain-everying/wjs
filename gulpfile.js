//引入gulp
var gulp = require('gulp');
//引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
var cleancss = require('gulp-cleancss');
//var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

var path = {
    sass: 'app/sass/**/*.scss', 
    css: 'app/static/css'
};
//检查JS脚本
gulp.task('lint',function(){
    gulp.src('app/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
//编译sass 读取 编译 输出到新文件夹中
gulp.task('sass',function(){
    return gulp.src(path.sass)
    .pipe(sass())
    .pipe(gulp.dest('app/static/css'));
});
//合并压缩文件
/*gulp.task('scripts',function(){
    //读取JS文件，合并，输出到新目录，重新命名，压缩，输出
    gulp.src('app/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('app/dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/dist'));
    读取CSS文件，合并，输出到新目录，重新命名，压缩，输出*/
/*gulp.task('cssmin',function(){
     gulp.src('app/static/scss/*.css')
    //.pipe(concat('all.css'))
    //.pipe(gulp.dest('app/css/min'))
    //.pipe(rename('all.min.css'))
    .pipe(cleancss({keepBreaks: false}))
    .pipe(gulp.dest('app/static/css'));
});*/
//服务器插件中，监视文件并自动刷新
gulp.task('serve', function() { 
    browserSync.init({ 
        server: { 
            baseDir: 'app' 
        }
    }); 
    gulp.watch(['app/static/js/*.js',path.sass,'app/view/*.html'],function(){
        gulp.run('lint','sass');
        browserSync.reload();
    });
});
//默认行为,直接调用服务器
gulp.task('default',function(){
    gulp.run('sass','serve');
});