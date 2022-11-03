const mysql = require('mysql');

function connectToMysql() {
  const dbConnection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'rootroot',
    database:'myCms'
  });

  dbConnection.connect(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("created connection to database");
    }
  });
}

module.exports = {
  connectToMysql,
}
