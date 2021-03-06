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
const article = require('./routes/article');
const programmerdate = require('./routes/programmerdate');
const carapp = require('./routes/carapp');

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
app.use(bodyParser({uploadDir: './Upload'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
      res.send(200);
  }
  else {
      next();
  }
});

 app.use(session({
    resave: true,  // 新增
    saveUninitialized: true,  // 新增
    cookie: {maxAge:Settings.cookietime},
    secret: Settings.COOKIE_SECRET
 }));
//文件上传
app.use(multer({dest:'./uploadimgfile'}));
//global.dbcar = mongoose.connect(Settings.URLCAR,{useMongoClient:true});
//global.db = mongoose.connect(Settings.URL,{useMongoClient:true});
global.db = mongoose.connect('mongodb://rootadminby:baiyangadmin311@180.76.249.237:27017/nodedb',{useMongoClient:true});
global.usersdb = require('./database/usersdb.js');

app.use('/', index);
app.use('/login', login);
app.use('/users', users);
app.use('/uploadfile', uploadfile);
app.use('/article', article);
app.use('/programmerdate', programmerdate);
app.use('/carapp', carapp);


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
