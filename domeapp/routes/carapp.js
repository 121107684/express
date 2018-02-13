var express = require('express');
var router = express.Router();
router.get("/addressblock", function (req, res, next) {
    var backobj = [{
        name: "北京——怀来",
        about: "今天天气不错哦！今天天气不错哦！",
        backimg: "bjhlbg.jpg",
        id: "bjhl"
    }, {
        name: "测试——测试",
        about: "今天心情不错哦！",
        backimg: "bjhlbg.jpg",
        id: "cscs"
    }]
    res.send({ "code": 200, "errormsg": "", data: backobj });
})
router.get("/getuserinfo", function (req, res, next) {
    let pdata = req.query.token;
    console.log(pdata)
    var User = global.usersdb.getModel('usertab');
    User.findOne({ openid: pdata }, { usernametrue: 1, age: 1, cartype: 1, phonenum: 1, carcode: 1, _id: 0 }, function (err, doc) {
        res.send({ "code": 200, "errormsg": "为保障服务质量，请删除无用数据", data: doc });
    })
})
router.get("/getuserpage", function (req, res, next) {
    let pdata = req.query.token;
    console.log(pdata)
    var cartimelist = global.usersdb.getModel('cartimelist');
    cartimelist.find({ id: pdata }, function (err, doc) {
        res.send({ "code": 200, "errormsg": "查询成功", data: doc });
    })
})
router.get("/getolddata", function (req, res, next) {
    let pdata = JSON.parse(req.query.data).id
    console.log(pdata)
    var searchtdata = {
        departure: 1,
        destination: 1,
        seatnum: 1,
        place: 1,
        date: 1,
        time: 1,
        memo: 1,
        array: 1,
        _id: 1
    }
    var cartimelist = global.usersdb.getModel('cartimelist');
    cartimelist.findOne({ _id: pdata }, searchtdata, function (err, doc) {
        res.send({ "code": 200, "errormsg": "查询成功", data: doc });
    })
})
router.post("/cardel", function (req, res, next) {
    let pdata = req.body;
    console.log(pdata)
    var cartimelist = global.usersdb.getModel('cartimelist');
    cartimelist.remove({ _id: pdata.data.id, id: pdata.token }, function (err, doc) {
        res.send({ "code": 200, "title": "删除成功", data: doc });
    })
})
router.post('/addgo', function (req, res, next) {
    console.log(req.body);
    var User = global.usersdb.getModel('usertab');
    var cartimelist = global.usersdb.getModel('cartimelist');
    console.log(cartimelist)
    let countnum = function () {
        var p = new Promise(function (resolve, reject) {
            cartimelist.count({ openid: req.body.token }, function (err, doc) {
                if (doc > 10) {
                    res.send({ "code": 200, "errormsg": "为保障服务质量，请删除无用数据" });
                }
                resolve()
            })
        })
        return p
    }
    let cretorupdata = function () {
        var p = new Promise(function (resolve, reject) {
            let docdata = req.body.data;
            docdata.id = req.body.token;
            docdata.statetime = new Date(req.body.data.date + " " + req.body.data.time).getTime();
            if (docdata._id) {
                cartimelist.update({ "_id": docdata._id }, docdata, function (err, doc) {
                    res.send({ "code": 200, "errormsg": "修改成功", data: doc });
                })
            } else {
                cartimelist.create(docdata, function (err, doc) {
                    res.send({ "code": 200, "errormsg": "发布成功", data: doc });
                })
            }
        })
        return p
    }
    countnum().then(function(){
        return cretorupdata() 
    })
})
router.post('/adduser', function (req, res, next) {
    // console.log({...req.body.data});
    let updata = {
        age: req.body.data.age,
        carcode: req.body.data.carcode,
        cartype: req.body.data.cartype,
        phonenum: req.body.data.phonenum,
        usernametrue: req.body.data.usernametrue
    }
    var User = global.usersdb.getModel('usertab');
    User.update({ openid: req.body.token }, { $set: updata }, function (doc, err) {
        res.send({ "code": 200, "errormsg": "操作成功", data: doc });
    })
})
router.get('/carlist', function (req, res, next) {
    let pdata = JSON.parse(req.query.data)
    let cartimelist = global.usersdb.getModel('cartimelist');
    var User = global.usersdb.getModel('usertab');
    const backdata = {}
    const getcars = function (pdata) {
        var p = new Promise(function (resolve, reject) {
            cartimelist.find({}, function (err, doc) {
                backdata.car = doc
                resolve(backdata.car)
            }).limit(pdata.limit).skip((pdata.index - 1) * pdata.limit)
        })
        return p
    }
    let getuser = function (cars) {
        var p = new Promise(function (resolve, reject) {
            let temarr = [];
            for (i in cars) {
                if (temarr.indexOf(cars[i].id) < 0) {
                    temarr.push(cars[i].id)
                }
            }
            User.find({ openid: { $in: temarr } }, { _id: 0 }, function (err, doc) {
                backdata.users = doc
                resolve()
            })
        })
        return p
    }
    let getallcar = function (data) {
        var p = new Promise(function (resolve, reject) {
            cartimelist.count({}, function (err, doc) {
                backdata.total = doc
                resolve()
            })
        })
        return p
    }
    getcars(pdata).then(function (cars) {
        return getuser(cars)
    }).then(function (data) {
        return getallcar()
    }).then(function () {
        console.log(backdata)
        res.send({ "code": 200, "errormsg": "", data: backdata });
    })
})
router.get('/carinfo', function (req, res, next) {
    let pdata = JSON.parse(req.query.data);
    let usertab = global.usersdb.getModel('usertab');
    let cartimelist = global.usersdb.getModel('cartimelist');
    let backdata = {};
    function getuser(data) {
        let callback = new Promise(function (resolve, reject) {
            usertab.findOne({ openid: data }, function (err, doc) {
                resolve(doc)
            })
        })
        return callback;
    }
    function getcar(data) {
        let callback = new Promise(function (resolve, reject) {
            cartimelist.findOne({ _id: data }, function (err, doc) {
                resolve(doc)
            })
        })
        return callback;
    }

    Promise.all([getuser(pdata.userid), getcar(pdata.carid)]).then(function (data) {
        backdata.user = data[0];
        backdata.car = data[1];
        res.send({ "code": 200, "errormsg": "", data: backdata })
    })
    //res.send({"code":200, "errormsg":"",data:backdata});
})
module.exports = router;