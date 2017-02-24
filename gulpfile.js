
var gulp = require('gulp');

var HEXO = require('./hexoAutoDoSth');

// var browserSync = require("browser-sync").create();
// var reload = browserSync.reload;


//定义多个单独任务

gulp.task('Clear', function(){
    console.log("开始清除本地旧的public文件...");
    HEXO.clear();
});

gulp.task('Generate', function(){
    console.log("重新生成本地静态文件[public] ...");
    HEXO.generate();
});

gulp.task('StartServer', function(){
    console.log("开启本地服务器...");
    HEXO.startServer();
});

gulp.task('Deploy', function(){
    console.log("开始将本地静态文件推送至远程服务器...");
    HEXO.deployTo();
});

gulp.task('BrowserSync', function(){
    HEXO.browserSync(); //Todo
});

//Default 方法
gulp.task('default', function(){
    gulp.run('Clear', 'Generate', 'StartServer');
    // gulp.watch('*.md', function(){
    //     // gulp.run('Clear', 'StartServer'); //后续添加刷新浏览器操作
    // });
    //目前当不用watch 本地修改md文件后，直接手动刷新浏览器即可查看最新修改？
    gulp.watch("source/_posts/*.md", function(){
        console.log("有文件变更了......");  //现已能监测到文件被修改或变化
        gulp.run('BrowserSync');
    });

    
    
});