var express = require('express');
var router = express.Router();
router.get("/addressblock",function(req,res,next){
    var backobj = [{
        name:"北京——怀来",
        about:"今天天气不错哦！今天天气不错哦！",
        backimg:"bjhlbg.jpg",
        id:"bjhl"
    },{
        name:"测试——测试",
        about:"今天心情不错哦！",
        backimg:"bjhlbg.jpg",
        id:"cscs"
    }]
    res.send({"code":200, "errormsg":"",data:backobj});
})
router.get("/getuserinfo",function(req,res,next){
    let pdata = req.query.token;
    console.log(pdata)
    var User = global.usersdb.getModel('usertab');
    User.findOne({openid:pdata},function(err,doc){
        console.log(doc)
    }) 
})
router.post('/addgo', function (req, res, next) {
    console.log(req.body);
    var User = global.usersdb.getModel('usertab');
    var cartimelist = global.usersdb.getModel('cartimelist');
   console.log(cartimelist)
    cartimelist.count({openid : req.body.token},function(err,doc){
        if(doc>10){
            res.send({"code":200, "errormsg":"为保障服务质量，请删除无用数据"});
        }
        console.log(req.body.data)
        let docdata = req.body.data;
        docdata.id = req.body.token;

        docdata.statetime = new Date(req.body.data.date+" "+req.body.data.time).getTime()
        cartimelist.create(docdata,function(err,doc){
            console.log(doc)
            res.send({"code":200, "errormsg":"发布成功",data:doc});
        })
    })
})
router.post('/adduser', function (req, res, next) {
   // console.log({...req.body.data});
    let updata = {
        age:req.body.data.age,
        carcode:req.body.data.carcode,
        cartype:req.body.data.cartype,
        phonenum:req.body.data.phonenum,
        usernametrue:req.body.data.usernametrue
    }
    var User = global.usersdb.getModel('usertab');
    User.update({openid : req.body.token},{$set:updata},function(doc,err){
        console.log(doc,err)
    })
})
router.get('/carlist', function (req, res, next) {
    let pdata = JSON.parse(req.query.data)
    let cartimelist = global.usersdb.getModel('cartimelist');
    var totalnum = -1
    cartimelist.count({},function(err,doc){
        totalnum = doc
    })
    cartimelist.find({},function(err,doc){
        res.send({"code":200, "errormsg":"",data:doc,"total":totalnum});
    }).limit(pdata.limit).skip((pdata.index - 1) * pdata.limit);
    // var User = global.usersdb.getModel('usertab');
    // User.update({openid : req.body.token},{$set :{...req.body.data}},function(doc,err){
    //     console.log(doc,err)
    // })
})
router.get('/carinfo', function (req, res, next) {
    let pdata = JSON.parse(req.query.data);
    let usertab = global.usersdb.getModel('usertab');
    let cartimelist = global.usersdb.getModel('cartimelist');
    let backdata = {};
    function getuser(data){
        let callback  = new Promise(function(resolve, reject){
            usertab.findOne({openid:data},function(err,doc){
                resolve(doc)
            }) 
        })
        return callback;
    }
    function getcar(data){
        let callback = new Promise(function(resolve, reject){
            cartimelist.findOne({_id:data},function(err,doc){
                resolve(doc)
            })
        })
        return callback;
    }

    Promise.all([getuser(pdata.userid),getcar(pdata.carid)]).then(function(data){
            console.log(data)
            backdata.user = data[0];
            backdata.car = data[1];
            res.send({"code":200, "errormsg":"",data:backdata})
    })
    //res.send({"code":200, "errormsg":"",data:backdata});
})
module.exports = router;