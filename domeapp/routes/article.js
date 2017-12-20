
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
  let users = {}
  const usertab = global.usersdb.getModel('usertab');
  usertab.find(sqlwhere, function (err, doc) {
    users=doc
  })
  article.find({}).populate('usertab').exec(function(err,doc){
    var usererror = { "code": 200, "text": "查询成功", data: doc };
    res.send(usererror);
  }).limit(req.body.size).skip(req.body.index)



  // article.find(sqlwhere, function (err, doc) {
  //   console.log(doc)
  //   for(var i=0;i<doc.length;i++){
  //     console.log(doc[i])
  //   }
  //   var usererror = { "code": 200, "text": "查询成功", data: doc };
  //   res.send(usererror);

  // }).limit(req.body.size).skip(req.body.index)
})


module.exports = router;