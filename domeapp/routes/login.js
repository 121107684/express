const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/login',function(req,res,next){
    request('https://api.weixin.qq.com/sns/jscode2session?appid=wx1240577fef2af12c&secret=0e2d5de2631d3af4dcb3d123de01c553&js_code='+req.body.jscode+'&grant_type=authorization_code', function (error, response, body) {  
    // if (!error && response.statusCode == 200) {
    //       console.log(body) // Show the HTML for the baidu homepage.
    //       return false;
    //     }
        var opidback =JSON.parse(body).openid;
        console.log(req.session)
        if(req.session.sign){
            console.log(req.session)
        }else{
            req.session.sign = true
            req.session.openid = opidback
        }
        var User = global.usersdb.getModel('usertab');
        User.findOne({openid:opidback},function(err,doc) {
            if(err){
                var usererror ={"code":500, "text":"网络错误","path":"login"};
                res.send(usererror);
            }else if(!doc){
                var userdata = {openid:opidback}
                User.create(userdata,function(err,doc){
                    var usererror ={"code":200, "text":"新用户创建成功","path":"login",data:doc.openid};
                    res.send(usererror);
                })
                
            }else{
                var usererror ={"code":200, "text":"找到了","path":"login",data:doc.openid};
                res.send(usererror);
                
            }
        }) 
        
    })




    // var User = global.usersdb.getModel('usertab');
    // User.findOne({account:req.body.account},function(err,doc) {
    //     if(err){
    //         var usererror ={"code":500, "text":"网络错误","path":"login"};
    //         res.send(usererror);
    //     }else if(!doc){
    //         var usererror ={"code":202, "text":"未找到该用户","path":"login"};
    //         res.send(usererror);
    //     }else{
    //         if(req.body.password != doc.password){
    //             var usererror ={"code":202, "text":"登录密码错误","path":"login"};
    //             res.send(usererror);
    //         }else{
    //             req.session.user = doc;
    //             userinfos.findOne({account:req.session.user.account},function(err,docs){
    //                 if(err){
    //                     var usererror ={"code":200, "text":"登录成功","userinfo":doc};
    //                     res.send(usererror);
    //                 }else{
    //                     var userinfos = eval('('+(JSON.stringify(doc)+JSON.stringify(docs)).replace(/}{/,',')+')');
    //                     var usererror ={"code":200, "text":"登录成功","userinfo":userinfos};
    //                     res.send(usererror);
    //                 }
    //             })


    //         }
    //     }
    // });
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