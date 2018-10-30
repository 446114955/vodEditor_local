/**
 * Created by cx on 2018/5/22.
 */
// 搭建数据库信息
const mysql = require('mysql');
var conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vodeditor'
});
module.exports = conn;