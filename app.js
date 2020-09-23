var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // PORT
  port: 8889,

  // USERNAME
  user: "root",

  //PASSWORD
  password: "root",
  database: "employee_trackerDB"

});


//CONNECTION MYSQL
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});

console.log("Diogo Candido");

