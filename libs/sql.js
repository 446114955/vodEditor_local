const db = require('../libs/db');
function db_query(res, sql, callback) {
    console.log(sql);
    db.query(sql, (err, result) => {
        try {
            callback(err, result);
        } catch (err) {
            // callback(err);
            // throw err;
            res.send({
                code: 400,
                err_code: err.code,
                msg: '请重新输入',
                err: err
            });
        }
    });
} 
function one(i) {
    console.log(i);
}
// console.log(db_query);
module.exports = {
    db_query: db_query
}
