const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'root',
  database:'elmasri_company'
});

export default db;
