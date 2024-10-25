
var mysql = require('mysql');

var con = mysql.createConnection({
    host: '172.16.1.189', 
    port: 3306,
    user: 'remote_user',   
    password: 'IbgaNt-66',
    database: 'managee'  
});

con.connect(function(err) {
  if (err) {
    console.error("Connection error:", err.message);
    return;
  }
  console.log("Connected!");
});

module.exports = con;