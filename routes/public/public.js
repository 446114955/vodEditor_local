const path = require('path');
const fs = require('fs');
// 创建文件夹
function mkdirB(path,res,files) {
    console.log('!!!!!!!!!!:',files);
    console.log('mkdirB:',path);
    // 如果文件存在传入files不需要创建
    return new Promise((resolve, reject) => {
        if(files){
            resolve();
            return;
        }
        fs.mkdir(path, (error) => {
            if (error) return reject(error);
            
            resolve();
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
// 移动文件夹
function moveFile(files, pathNow,res) {
    console.log('moveFile:',pathNow);
    return new Promise((resolve, reject) => {
        if (files.length < 1) {
            resolve();
        } else {
            let newFile = `${pathNow}/${files[0][1].name}`
            fs.rename(files[0][1].path, newFile, (error) => {
                if (error) return reject(error);
                resolve(files[0][1].name);
            });
        }

    }).catch(function(error) {
        // 处理 getJSON 和 前一个回调函数运行时发生的错误
        reject('errow:',error);
        res.send({
            code:'500',
            msg:'数据上传失败',
        });
    });        
}
// 读取json
function readFiles([req,res]){
   
    return new Promise((resolve, reject) => {
        let id = req.query.id
        let baseUrl = `../../public/data/${id}/data.json`;
        let pathNow = path.resolve(__dirname, baseUrl);
        let file = null;
        fs.readFile(pathNow,(err,data)=>{
            if(err) {
                console.log(111111111111)
                reject('errow:',err);
                res.send({
                    code:'200',
                    data:'',
                    msg:'获取失败'
                });
                return;
            }else{
                
                file = JSON.parse(data);
                resolve(file);
            }
        });
    }).catch(function(error) {
        
        return;
    });
}
module.exports = {
    mkdirB:mkdirB,
    moveFile:moveFile,
    readFiles:readFiles
}