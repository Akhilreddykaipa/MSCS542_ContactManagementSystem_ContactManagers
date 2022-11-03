const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host: '127.0.0.1',
  user:'root',
  password:'root',
  database:'myCms'
});

dbConnection.connect(function(err) {
  if (err) {
    console.log("failed connection.");
    console.log(err);
  } else {
    console.log("created connection to database");
  }
});

dbConnection.query('show tables', (err, result) => {
  if(err) {
    console.log("failed conenction.");
    console.log(err);
  }
  console.log("Query result:", result);
});

module.exports = {
  dbConnection
}
