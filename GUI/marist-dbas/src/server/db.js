const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user:'marist_dbas',
  password:'rootroot',
  database: 'myCms'
});

dbConnection.connect(function(err) {
  if (err) {
    console.log("failed connection.");
    console.log(err);
  } else {
    console.log("created connection to database");
  }
});

// dbConnection.query('show tables', (err, result) => {
//   if(err) {
//     console.log("failed conenction.");
//     console.log(err);
//   }
//   console.log("Query result:", result);
// });

module.exports = {
  dbConnection
}
