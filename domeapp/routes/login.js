const express = require('express');
const router = express.Router();

router.post('/login',function(req,res,next){
    console.log(req.body);
    var User = global.usersdb.getModel('usertab');
    var userinfos = global.usersdb.getModel('userinfo');
    User.findOne({account:req.body.account},function(err,doc) {
        if(err){
            var usererror ={"code":500, "text":"网络错误","path":"login"};
            res.send(usererror);
        }else if(!doc){
            var usererror ={"code":202, "text":"未找到该用户","path":"login"};
            res.send(usererror);
        }else{
            if(req.body.password != doc.password){
                var usererror ={"code":202, "text":"登录密码错误","path":"login"};
                res.send(usererror);
            }else{
                req.session.user = doc;
                userinfos.findOne({account:req.session.user.account},function(err,docs){
                    if(err){
                        var usererror ={"code":200, "text":"登录成功","userinfo":doc};
                        res.send(usererror);
                    }else{
                        var userinfos = eval('('+(JSON.stringify(doc)+JSON.stringify(docs)).replace(/}{/,',')+')');
                        var usererror ={"code":200, "text":"登录成功","userinfo":userinfos};
                        res.send(usererror);
                    }
                })


            }
        }
    });
})
module.exports = router;