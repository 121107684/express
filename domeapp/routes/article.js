var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/addnew', function(req, res, next) {
  console.log(req.body)
});

module.exports = router;