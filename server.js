//required packages
const express       = require("express")
const jsonwebtoken  = require('jsonwebtoken')
var mysql           = require('mysql');
const app           = express()

//sets a limit on how much json express will handle
app.use(express.json({limit:'1mb'}))

//this controlls cors realtion cross site so the server and front end can talk
app.use(function (req, res, next) {

  //apps/d22pdg97zjrsk5
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE,');

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'Accept')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authentication');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  // Pass to next layer of middleware
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});





//###################################################
//############## THIS IS A TEMPLATE #################
//###################################################
//this also shos wether there is a conenction
//disbale for production

app.get('/', (req, res) => {
var connection = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password:"", 
    database:"lor"
    
  });
  connection.query('SELECT * FROM users', function (error, results, fields) {
      if (error) throw error;
      res.json(results)
    });
connection.end()
});





//###################################################
//############## LOGIN END POINT ####################
//###################################################

app.post('/login', (req, res) =>{
  //save input from the request
  let username = req.body.username
  let  password = req.body.password
  
  // Connect to database
  var connection = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password:"", 
    database:"lor"
    
  });

  //define input from the request as an array
  var user = [username,password]

  //tell me the endpoint works
  console.log("i got a request")

  //use the connection to connect
  connection.connect(function(err) {
    if (err) throw err;

    //tell me you connected
    console.log("Connected!");

    //define the sql statement
    var sql = "SELECT * FROM users WHERE username = ? AND password = ?";

    //query the DB
    connection.query(sql, user, function (err, result) {
      if (err) {throw err;}

      //tell me if a user was found
      console.log("found the user");

      //save the users ID for a token
      userID = result[0].userID;

      //define and deliver token
      //the token is what defines we are logged in
      var token = jsonwebtoken.sign({userID:userID, username:req.body.username}, 'Zed') //our secret key should probably be stronger but this ic an remeber for now
      res.send(token)
      connection.end()//terminate connection
    });
  });

  //missing validation
  //  check if user exists 
  //if password correct

  // IF Exist and password correct get ID, username (and everything  thatøs not personal) and put it  into the jsonWebToken
  
})






//#####################################################
//############### REGISTER A NEW USER #################s
//#####################################################
app.post('/register', (req, res) =>{
  
  //define connection
  var connection = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password:"", 
    database:"lor"
    
  });


  //define a new user as na array
  var newuser = [req.body.username,req.body.password]


  //tell me i hit the endpoint
  console.log("i got a request")


  //connect
  connection.connect(function(err) {
    if (err) throw err;

    //tell me if the connection worked
    console.log("Connected!");

    //define the sql statement
    var sql = "INSERT INTO users (username, password) VALUES ( ?, ?)";

    //run it
    connection.query(sql, newuser, function (err, result) {
      if (err) throw err;

      //tell me if it worked
      console.log("1 record inserted");
      connection.end() //terminate the connection
    });
  });
})










//#####################################################
//######## Fetches all data in the user TABLE  ########
//#####################################################

app.get('/fetchData', (req, res) =>{

    //define the WEB token
    let jwt = req.header("Authentication")

    // verify with the token
    jsonwebtoken.verify(jwt, 'Zed', function(err, decoded){
      if(err || decoded == undefined ){
        console.log('Error in JWT');
        res.status(500).json({"error":"Couldn't verify"});
        return;
    }

    //get the userID
    let id = decoded.userID


    // Connect to Database and fetch data with  the id^
    var connection = mysql.createConnection({
      host: "localhost", 
      user: "root",
      password:"", 
      database:"lor"
      
    });

    //connect
    connection.connect(function(err) {
      if (err) throw err;

      //tell em you connected
      console.log("fetchuser Connected!");

      //define SQL statement
      var sql = "SELECT * FROM users WHERE userID = ?";

      //run it
      connection.query(sql, id, function (err, result) {
        if (err) throw err;

        //tell me it worked
        console.log("user fetched");

        // Send data back to the browser
        res.json(result)
        connection.end()
      });
    });


  })

})








//#####################################################
//############ SAVE A DECK ############################
//#####################################################

app.post('/saveDeck', (req, res) =>{

  //get the token
  let jwt = req.header("Authentication")

  // verify it
  jsonwebtoken.verify(jwt, 'Zed', function(err, decoded){
    if(err || decoded == undefined){
      console.log('Error in JWT');
      res.status(500).json({"error":"Couldn't verify"});
      return;
    }

    //get the data from the request
    let id = decoded.userID
    let deck = req.body.deckCode
    let deckName = req.body.deckName
    

    //define them as arrays as neeed for the SQL SATEMENTS
    let decklist = [id, deck, deckName]
    let deckchek = [id, deckName]
    let deckUpdate = [deck,id, deckName]


    // Connect to Database and fetch data with  the id^
    var connection = mysql.createConnection({
      host: "localhost", 
      user: "root",
      password:"", 
      database:"lor"
      
    });


    // Connect
    connection.connect(function(err) {
      if (err) throw err;

      //we want to see if the deck already exists
      //define the first SQL statement
      var sql = "SELECT deckName FROM decks WHERE userID = ? AND deckName = ?";

      //run it
      connection.query(sql, deckchek, function (err, result) {
        if (err) throw err;

        //check if the deck already existed or not
        if (result.length < 1) {
          if (err) throw err;

          //save the deck if it didnt exist
          var sql = "INSERT INTO decks (userID, decklist, deckName) VALUES ( ?, ?, ?)";
          connection.query(sql, decklist, function (err, result) {
            if (err) throw err;

            //tell me it saved
            console.log("deck saved");

            //return a message WIP
            res.json({message:"deck saved"})
            connection.end() //end the connection
          });
        }else{

          if (err) throw err;

          //UPDATE AN EXISTING DECK
          //define the SQL
          var sql = "UPDATE decks SET decklist = ? WHERE userID = ? AND deckName = ?";

          //run it
          connection.query(sql, deckUpdate, function (err, result) {
            if (err) throw err;

            //tell me you updated
            console.log("deck updated");

            //return a message WIP
            res.json({message:"deck Updated"})
            connection.end()//ternminate connection
       
          });
        }
      });
    })
  })
})
// #####################################################
// ################## LOAD DECKS #######################
// #####################################################

app.get('/loadDeck', (req, res) =>{

  //get the token
  let jwt = req.header("Authentication")
  console.log(jwt)

  // verify it
  jsonwebtoken.verify(jwt, 'Zed', function(err, decoded){
    if(err || decoded == undefined){
      console.log('Error in JWT');
      res.status(500).json({"error":"Couldn't verify"});
      return;
    }

    //decode the suer id
    let id = decoded.userID

    // Connect to Database and fetch data with  the id^
    var connection = mysql.createConnection({
      host: "localhost", 
      user: "root",
      password:"", 
      database:"lor"
      
    });

    //connect
    connection.connect(function(err) {
      if (err) throw err;

      //tell me you connected
      console.log("Connected!");

      //define the SQL
      var sql = "SELECT * FROM decks WHERE userID = ?";

      //run it
      connection.query(sql, id, function (err, result) {
        if (err) throw err;

        //tell em it worked
        console.log("decks loaded");

        //return the decks
        res.json(result)
        connection.end()
      });
    });
  })
})

// #####################################################
// ############### DELETE A DECK #######################
// #####################################################
app.delete('/deleteDeck', (req, res) =>{

  let jwt = req.header("Authentication")
  console.log(jwt)

  // verify the token
  jsonwebtoken.verify(jwt, 'Zed', function(err, decoded){
    if(err || decoded == undefined){
      console.log('Error in JWT');
      res.status(500).json({"error":"Couldn't verify"});
      return;
    }

    //define the deck and who owns it
    let id = decoded.userID
    let deckName = req.body.deckToBeDeleted
    const deleteDeck = [id, deckName]



    // Connect to Database and fetch data with  the id^
    var connection = mysql.createConnection({
      host: "localhost", 
      user: "root",
      password:"", 
      database:"lor"
      
    });


    //connect
    connection.connect(function(err) {
      if (err) throw err;

      //tell em ti worked
      console.log("Connected!");

      //define sql
      var sql = "DELETE FROM decks WHERE userID = ? AND deckName = ?";

      //run it
      connection.query(sql, deleteDeck, function (err, result) {
        if (err) throw err;

        //tell em it worked
        console.log("deck deleted");
        res.json(result)//we dont need this
        connection.end()//end the connection
      });
    });
  })
})










// #####################################################
// ################# LSITEN HERE YOU! ##################
// #####################################################


app.listen("5000", err => {
  if(err){console.log.log('server cannot listen');return}
  console.log("server is listning")
})


// #####################################################
// ## END OF FILE NOTHING SHOULD BE BEYOND THIS POINT ##
// #####################################################

//             turn back ye who enters

// .____     ___________ ___________________ _______  ________    _________                     
// |    |    \_   _____//  _____/\_   _____/ \      \ \______ \  /   _____/                     
// |    |     |    __)_/   \  ___ |    __)_  /   |   \ |    |  \ \_____  \                      
// |    |___  |        \    \_\  \|        \/    |    \|    `   \/        \                     
// |_______ \/_______  /\______  /_______  /\____|__  /_______  /_______  /                     
//         \/        \/        \/        \/         \/        \/        \/                      
// ________  ___________                                                                        
// \_____  \ \_   _____/                                                                        
//  /   |   \ |    __)                                                                          
// /    |    \|     \                                                                           
// \_______  /\___  /                                                                           
//         \/     \/                                                                            
// __________ ____ __________  _____________________________________________________    _____   
// \______   \    |   \      \ \_   _____/\__    ___/\_   _____/\______   \______   \  /  _  \  
//  |       _/    |   /   |   \ |    __)_   |    |    |    __)_  |       _/|       _/ /  /_\  \ 
//  |    |   \    |  /    |    \|        \  |    |    |        \ |    |   \|    |   \/    |    \
//  |____|_  /______/\____|__  /_______  /  |____|   /_______  / |____|_  /|____|_  /\____|__  /
//         \/                \/        \/                    \/         \/        \/         \/ 