// const mariadb = require('mariadb');

// var mysql      = require('mysql');

// var connection = mysql.createConnection({
//     host: "runeterrahell.ch3fgii4jqfi.eu-north-1.rds.amazonaws.com", 
//     user: "admin",
//     password:"K0mpu73r12,", 
//     // database:"runeterrahell",
// });
var mysql      = require('mysql');
var connection = mysql.createConnection({
  // host: "10.27.22.48", 
  // database:"cpanelcarle_dk_carle_dk",
  // user: "cpanelcarle_dk_carle_dk",
  // password:"pTWPBy4Y", 
  // charset:"utf8mb4"
  host: "localhost", 
  user: "root",
  password:"", 
  database:"holdidayhouses"
  
});
connection.query('SELECT * FROM houses', function (error, results, fields) {
    if (error) throw error;
    // res.json(result)
    console.log('The solution is: ', results);
  });
connection.end()
  
