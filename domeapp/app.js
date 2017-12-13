const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Settings = require('./database/settings');

var multer  = require('multer');
var fs = require("fs");

const index = require('./routes/index');
const login = require('./routes/login');
const users = require('./routes/users');
const uploadfile = require('./routes/upload');

const app = express(mongoose);

//设置跨域访问
app.all('/app*/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile); 
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({ dest: '/tmp/'}).array('image'));
// app.use(session({
//   cookie: {maxAge:Settings.cookietime},
//   secret: Settings.COOKIE_SECRET
// }));
//文件上传
const upload = multer({ dest: '/tmp/'})
//const cpUpload = upload.any();
//app.use(cpUpload);
// global.usersdb = require('./database/usersdb.js');
// global.db = mongoose.connect(Settings.URL);

app.use('/', index);
app.use('/login', login);
app.use('/users', users);
app.use('/uploadfile', uploadfile);
app.post('/fileupload',upload.single("test-log"),function (req, res) {
      //将表单中name是name_txt的input元素中的文本内容取出
      var txtFromFront = req.body.name_txt;
  
      //获取上传的文件的文件名和绝对路径,注意先引入fs和path模块
      var oriNameOfFile = req.files.name_file.originalFilename || path.basename(req.files.name_file.ws.path);
      var oriPathOfFile = req.files.name_file.path;
  
      //定义文件的输出路径，我在此处没有改变上传的文件名，具体可以按照需求改变输出路径和文件名
      var targetPathOfFile = '/Music_Lib/public/demo_file/' + oriNameOfFile;
      console.log(targetPathOfFile,"aaaaaaaa")
      //读取和输出文件到目标路径
      fs.readFile(oriPathOfFile,function (err, data) {
  
          fs.writeFile(targetPathOfFile,data,function (err) {
  
              if(err){
                  console.log('文件在存储过程中出错了：' + err);
  
                  res.send({result:"fail",reason:"保存文件失败"});//将消息发送(回复)给请求的ajax
              }else {
                  console.log('File saved successfully!');
  
                  res.send({result:"success"});//将消息发送(回复)给请求的ajax
              }
          });
      });
  });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
