var express = require('express');
var router = express.Router();
const db = require('../../libs/db.js');
const mysql = require('mysql');
const selectSql = require('../server/select')
/* post home page. */
router.post('/', function(req, res, next) {
  let useContent = JSON.parse(req.body.content);

  const columnNames = '*';
  const table = 'user';
  const singleColName = useContent;
  var sql = selectSql.selectSin(columnNames,table,singleColName,'and');
  console.log(sql);
  selectSql.db_query(sql,null,res).then((result)=>{
    if(result==''){
      res.send({
          code:500,
          msg:'账号密码错误'
      }).end();
      return;
    }else {
      res.send({
        code:200,
        msg:'登录成功'
      }).end();
    }
  });
});

module.exports = router;
