var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var signin = require('./routes/signin/signin');
var creat = require('./routes/server/createSpe');
var list = require('./routes/server/showList');
// 选择专题
const chooseSpe = require('./routes/server/chooseSpe');
// 上传图片
const uplodPic = require('./routes/editor/uploadPic');
// 上传按钮
const uploadBtn = require('./routes/editor/uploadBtn');
// 保存json
const saveJson = require('./routes/server/saveJson');
// 获取json
const getJson = require('./routes/server/getJson');
// 下载文件
const downloadFile = require('./routes/server/downloadFile');

var app = express();
//allow custom header and CORS
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.engine('html', require('ejs').__express);  
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// 登陆接口
app.use('/signin',signin);
// 创建专题路由
app.use('/spe/creat',creat);
// 选择专题接口
app.use('/choose/special',chooseSpe);
// 获取专题列表
app.use('/spe/list',list);
// 上传图片接口
app.use('/image/upload',uplodPic);
// 上传按钮接口
app.use('/btn/upload',uploadBtn);
// 保存json
app.use('/save/json',saveJson);
// 读取json
app.use('/get/json',getJson);
// 下载html文件
app.use('/download/file',downloadFile);


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
