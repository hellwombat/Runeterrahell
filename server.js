const express = require("express")
// const session = require("express-session")
constpath = require("path")
var mysql      = require('mysql');
const app = express()
// app.use(cors())
// app.use(express.static('public'))
app.use(express.json({limit:'1mb'}))
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:apps/d22pdg97zjrsk5');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});



app.get('/', (req, res) => {
var connection = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password:"", 
    database:"lor"
    
  });
  connection.query('SELECT * FROM users', function (error, results, fields) {
      if (error) throw error;

      console.log('The solution is: ', results);
      res.json(results)
    });
connection.end()
});

//###################################################
app.post('/login', (req, res) =>{
  
})
app.get('/login', (req, res) =>{
})
app.post('/logout', (req, res) =>{
  
})
//#####################################################
app.post('/register', (req, res) =>{
  
  var connection = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password:"", 
    database:"lor"
    
  });
  var newuser = [req.body.username,req.body.password]
  
  // console.log(req)
  console.log(req.body)
  console.log("i got a request")
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO users (username, password) VALUES ( ?, ?)";
    connection.query(sql, newuser, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      req.header("Access-Control-Allow-Origin", "*");
      res.json("hi")
      connection.end()
    });
  });


})


app.get('/register', (req, res) =>{

})
//#####################################################

app.listen("5000", err => {
  if(err){console.log.log('server cannot listen');return}
  console.log("server is listning")
})


// #####################################################


