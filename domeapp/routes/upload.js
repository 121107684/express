var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/upimg', function(req, res, next) {
    console.log(req)
    var filed = req.files;
    console.log(filed)
    if(filed){
        var timestamp = Date.parse(new Date());//时间戳，凑活用了（注意少了八个时区);
        var extension = req.files.file.extension;
        var tmpPath = req.files.file.path;
        var basePath = path.dirname(__dirname);
        var targetPath =basePath+'/public/Upload/'+req.session.user.username+timestamp+'.'+req.files.file.extension;
        fs.rename(tmpPath, targetPath,function(err) {
            if(err){
                res.send({code: 200, msg:err});
            }else{
                //删除临时文件
                fs.unlink(tmpPath, function(){
                    if(err) {
                        res.send({code: 200, msg:err});
                    }
                })
            }
        })
    }
});

module.exports = router;
