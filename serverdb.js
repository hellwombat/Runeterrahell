// const mariadb = require('mariadb');

// var mysql      = require('mysql');

// var connection = mysql.createConnection({
//     host: "runeterrahell.ch3fgii4jqfi.eu-north-1.rds.amazonaws.com", 
//     user: "admin",
//     password:"K0mpu73r12,", 
//     // database:"runeterrahell",
// });
// host: "localhost", 
// user: "root",
// password:"", 
// database:"holdidayhouses"
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host: "carle.dk", 
//   user: "carle_dk",
//   password:"pTWPBy4Y", 
//   database:"carle_dk",
//   charset:"utf8mb4"
// });
// connection.query('SELECT * FROM houses', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//   });

  
Storage.put('test.txt', 'Hello')
    .then (result => console.log(result)) // {key: "test.txt"}
    .catch(err => console.log(err));