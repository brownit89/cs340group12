var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_satherde',
  password        : '3752',
  database        : 'cs340_satherde'
});
module.exports.pool = pool;
