var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_brownith',
  password        : '',
  database        : 'cs340_brownith'
});
module.exports.pool = pool;
