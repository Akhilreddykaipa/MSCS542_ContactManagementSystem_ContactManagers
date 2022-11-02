const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'rootroot',
  database:'myCms'
});

export default db;
