
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/addnew', function (req, res, next) {
  console.log(req.body);
  const article = global.usersdb.getModel('article');

  article.create(req.body, function (err, doc) {
    var usererror = { "code": 200, "text": "新建成功", data: doc };
    res.send(usererror);
  })

});
router.post("/articlelist", function (req, res, next) {
  var sqlwhere = req.body.searchdata || {}
  const article = global.usersdb.getModel('article');
  const usertab = global.usersdb.getModel('usertab');
  var usererror = {};
  let arruse = []
  // article.find({}).populate('usertab').exec(function (err, doc) {
  //   usertab.find({ openid: { $in: doc }}).populate('article').exec(function (err, posts) {
  //     var usererror = { "code": 200, "text": "查询成功", data:{art:doc,user:posts} }
  //   })
  // }).limit(req.body.size).skip(req.body.index)
  article.find(sqlwhere,function(err,doc){
    doc.forEach(function(data,index){
      arruse.push(data.openidu)
    })
    finduser(arruse)
  }).limit(req.body.size).skip(req.body.index)

  function finduser(arr){
    usertab.find({openid:{$in:arr}},function(err,doc){
      console.log(doc)
    })
  }
  
  res.send(usererror);
})


module.exports = router;