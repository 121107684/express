const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/login',function(req,res,next){
    console.log(req);
    console.log(2222);
    var User = global.usersdb.getModel('usertab');
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
router.get("/login",function(req,res,next){
    console.log(req.query.jscode);
    request('https://api.weixin.qq.com/sns/jscode2session?appid=wx7a539d4bb75b88a0&secret=3588f9f56cf48d44e6b56f91e46d0f37&js_code='+req.query.jscode+'&grant_type=authorization_code', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Show the HTML for the baidu homepage.
        }
        console.log(error, response, body)
      })

})
module.exports = router;