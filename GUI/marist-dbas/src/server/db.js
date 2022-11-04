const mysql = require('mysql');
const { promisify } = require('util');

const con = mysql.createConnection({
  host: 'localhost',
  user:'marist_dbas',
  password:'rootroot',
  database: 'myCms'
});

con.connect(function(err) {
  if (err) {
    console.log("failed connection.");
    console.log(err);
  } else {
    console.log("created connection to database");
  }
});

module.exports = {
  con,
}
