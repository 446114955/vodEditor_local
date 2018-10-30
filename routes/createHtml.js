var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
/* GET home page. */
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var setInner = async function(){
    var header = `<meta name="page-view-size" content="1280*720">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>专题12-九州乐学-小伴龙带你开学爆到</title><style>
    body {
        width: 1280px;
        height: 720px;
        margin: 0;
        background: transparent url("./assets/zhuanti12/ztbj.png") no-repeat;
    }
    #console {
        position: absolute;
        z-index: 1000;
        top: 70px;
        left: 30px;
        width: 600px;
        height: 600px;
        background-color: rgba(0,0,0,0.7);
        color: #fff;
        word-wrap:break-word;
        overflow-y: scroll;
    }

    #console pre{
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    .none,.hide {
        display: none !important;
    }
    .logo {
        width: 90px;
        height: 75px;
        position: absolute;
        z-index: 20;
        top: 20px;
        left: 40px;
    }
    .logo1{
        position: absolute;
        z-index: 20;
        top: 15px;
        left:1100px;
    }
    #focus{
        position: absolute;
        z-index: 20;
        top: 556px;
        /* left: 23px; */
    }
    .focus0{
        /* top: 215px; */
        left:124px;
    }
    .focus1{
        /* top: 282px; */
        left:350px;
    }
    .focus2{
        /* top: 350px; */
        left:576px;
    }
    .focus3{
        /* top: 416px; */
        left:804px;
    }
    .btn-wrapper img {
        position: absolute;
        z-index: 10;
    }
    .video-img {
        position: absolute;
        z-index: 20;
        top: 178px;
        left: 102px;

    }
</style>`;
    var body = `<body>
    <div id="btn-wrapper" class="btn-wrapper">
        <img class="btn-img hide" src="./assets/zhuanti12/video.png" style="top:178px;left:102px;">
        <img class="btn-img" src="./assets/zhuanti12/t1.png" style="top: 412px; left: 812px">
        <img class="btn-img" src="./assets/zhuanti12/t2.png" style="top: 412px; left: 958px">
        <img class="btn-img" src="./assets/zhuanti12/t3.png" style="top: 470px; left: 812px">
        <img class="btn-img" src="./assets/zhuanti12/t4.png" style="top: 470px; left: 958px">
        <img class="btn-img" src="./assets/zhuanti12/more.png" style="top: 540px; left: 1060px">
        <img class="btn-img" src="./assets/zhuanti12/back.png" style="top: 60px; left: 1145px">
    </div>
    
    <div id="console" class="none"></div>
    <img id="focus" class="hide" src="./assets/zhuanti12/select.png">
    <img src="./assets/zhuanti12/video-img.png" class="video-img none">
    <!-- <img src="./assets/zhuanti12/log.png" class="logo"> -->
    <!-- <img src="./assets/zhuanti12/log1.png" class="logo1"> -->
    <iframe id="iframeContainer" name="iframeContainer" src="" style="background-color:transparent" width="0" height="0" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="true"></iframe>
    </body>`;
    return `<!DOCTYPE html><html><header>${header}</header><body>${body}</body></html>`;
}

module.exports = router;