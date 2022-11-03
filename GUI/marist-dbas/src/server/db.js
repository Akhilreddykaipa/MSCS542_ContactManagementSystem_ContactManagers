const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'rootroot',
  database:'myCms'
});

dbConnection.connect(function(err) {
    if(err){
        console.log(err);
    }

    console.log("created connection to database");
});

module.exports = {
  dbConnection,
}
// export default dbConnection;
