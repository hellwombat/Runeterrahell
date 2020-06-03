const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "carle.dk", 
    user: "carle_dk",
    password:"pTWPBy4Y", 
    database:"carle_dk".
    // time_zone: 'UTC-1'
    connectTimeout:100000
})

connection.query("SELECT 1 as val",(err,rows,fields) => {
  if(err){throw err}
  console.log("fetched")

})

