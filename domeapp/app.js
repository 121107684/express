const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Settings = require('./database/settings');


const index = require('./routes/index');
const login = require('./routes/login');
const users = require('./routes/users');

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

app.use(session({
  cookie: {maxAge:Settings.cookietime},
  secret: Settings.COOKIE_SECRET
}));
//文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/user')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage });
const cpUpload = upload.any();
app.use(cpUpload);
global.usersdb = require('./database/usersdb.js');
global.db = mongoose.connect(Settings.URL);

app.use('/', index);
app.use('/login', login);
app.use('/users', users);



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
