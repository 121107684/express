var express = require('express');
var router = express.Router();
var path= require("path")
var fs = require('fs');



/* GET home page. */
router.post('/upimg', function(req, res, next) {
    
    var filed = req.files;
    console.log(req)
    if(filed){
        var timestamp = Date.parse(new Date());//时间戳，凑活用了（注意少了八个时区);
        var extension = filed.data.extension;
        var tmpPath = filed.data.path;
        var basePath = path.dirname(__dirname);
        var targetPath =basePath+'/public/Upload/'+timestamp+'.'+filed.data.extension;
        fs.rename(tmpPath, targetPath,function(err) {
            if(err){
                res.send({code: 200, msg:err});
            }else{
                //删除临时文件
                fs.unlink(tmpPath, function(){
                    if(err) {
                        res.send({code: 200, msg:err});
                    }else{
                        var data = {
                            img:'/Upload/'+timestamp+'.'+filed.data.extension                    
                        }
                        res.send({code: 200, msg:"成功",data:data});
                    }
                })
            }
        })
    }
});

module.exports = router;
