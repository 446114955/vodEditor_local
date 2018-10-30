var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const selectSql = require('../server/select');
// 处理上传数据
const uploadFun = require('../server/upload');
// 公共方法
const public = require('../public/public');
router.post('/', function (req, res, next) {
    initUpLoad([req, res]);
});

// 异步加载读取图片
async function initUpLoad([req, res]) {
    // 读取图片
    let fileCon = await uploadFun([req, res]);
    await handleFile([fileCon, req, res]);
}

async function handleFile([fileCon, req, res]) {
    console.log("fileCon:", fileCon);
    let speId = '';
    let fields = fileCon[0];
    let files = fileCon[1];
    if (!files) reject();
    speId = fields[0][1];
    let dataId = fields[1][1];
    console.log('files:', files);
    console.log('dataId:', dataId);
    let baseUrl = `../../public/data/${speId}/image`;
    let relatUrl = `data/${speId}`;
    // 获取pubilc/images的绝对路径
    let pathNow = path.resolve(__dirname, baseUrl);
    let newFile = await public.moveFile(files, pathNow,res)
    await resData(res, newFile, pathNow, speId,dataId).catch(function (error) {
        // 处理 getJSON 和 前一个回调函数运行时发生的错误
        reject('errow:', error);
        res.send({
            code: '500',
            msg: '数据上传失败',
        });
    });

}

// 返回数据
async function resData(res,newFile,pathNow,speId,dataId){
    if(!res) reject(); 
    res.send({
        code:'200',
        msg:'创建成功',
        id:speId,
        dataId:dataId,
        picName:newFile,
        pathNow:pathNow,
    });
}
module.exports = router;