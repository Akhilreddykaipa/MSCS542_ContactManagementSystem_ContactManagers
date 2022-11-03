const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'rootroot',
  database:'myCms'
});

db.connect(function(err) {
    if(err){
        console.log(err);
    }

    console.log("created connection to database");
});

module.exports = {
  db,
}
// export default db;
