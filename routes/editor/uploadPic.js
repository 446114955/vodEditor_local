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
    // 专题ID
    let speId = '';
    let fields = fileCon[0];
    let files = fileCon[1];
    console.log('fields:', fields);
    console.log('files:', files);
    if (!fields) reject();
    speId = fields[0][1];
    let baseUrl = `../../public/data/${speId}/image`;
    let relatUrl = `data/${speId}`;
    // 获取pubilc/images的绝对路径
    let pathNow = path.resolve(__dirname, baseUrl);
    console.log('pathNow:', pathNow)
    try {
        let con = await exitFile(pathNow)
        await public.mkdirB(`${pathNow}`,res,con);
        let newFile = await public.moveFile(files, pathNow,res)
        await resData(res,newFile,pathNow,speId).catch(function(error) {
            // 处理 getJSON 和 前一个回调函数运行时发生的错误
            reject('errow:',error);
            res.send({
                code:'500',
                msg:'数据上传失败',
            });
        });      
    } catch (e) {
        res.send({
            code:'500',
            msg:'数据上传失败',
        });
    }
    
}
// 判断是否存在文件夹
function exitFile(pathNow,res) {
    return new Promise((resolve, reject) => {
        if (!pathNow) reject();
        console.log(pathNow);
        let con = null;
        fs.access(`${pathNow}`, function (err) {
            if (err) {
                // console.log('imagePath:', imagePath);
                // resolve(imagePath);
                con = false;
                console.log('con111:',con)
                resolve(con);
            } else {
                con = true;
                console.log('con222:',con)
                resolve(con);
            }

        });
    }).catch(function(error) {
        // 处理 getJSON 和 前一个回调函数运行时发生的错误
        reject('errow:',error);
        res.send({
            code:'500',
            msg:'数据上传失败',
        });
    });
}
// 返回数据
async function resData(res,newFile,pathNow,speId){
    if(!res) reject(); 
    res.send({
        code:'200',
        msg:'创建成功',
        id:speId,
        picName:newFile,
        pathNow:pathNow,
    });
}

module.exports = router;