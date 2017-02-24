
var exec = require('child_process').exec;
module.exports = {

    clear: function(){
        //do hexo clean
        
        var cmd = "hexo clean";
        this.executeCmd(cmd);
    },
    generate: function(){
        //do hexo generate
        var cmd = "hexo g";
        this.executeCmd(cmd);
    },
    startServer: function(){
        //do hexo s
        var cmd = "hexo s -o";
        this.executeCmd(cmd);
    },
    deployTo: function(){
        //deploy to GitHub
        var cmd = "hexo d";
        this.executeCmd(cmd);
    },
    browserSync: function(){
        //For sync if sth modified in local view 
        //Todo
    },
    executeCmd: function(s){
        exec(s, function(err, stdout, stderr){
            if(err){
                console.log(err);
            }else{
                console.log(stdout);
            }
        });
    }
};