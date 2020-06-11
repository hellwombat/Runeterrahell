//required packages
const express       = require("express")
const jsonwebtoken  = require('jsonwebtoken')
const mysql         = require('mysql');
const app           = express()
const Knex        = require('knex');


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
//############## LOGIN END POINT ####################
//###################################################

app.post('/login', (req, res) =>{
  //save input from the request
  let username = req.body.username
  let  password = req.body.password
  
  //tell me the endpoint works
  console.log("i got a request")

//get the model
  const User = require("./models/Users");
    

  // Connect to Database and fetch data with  the id^
  const knex = Knex({
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
      host: "localhost", 
      user: "root",
      password:"", 
      database:"lor"
    }
  });


  console.log("Connected!");
  const { Model } = require('objection');
  Model.knex(knex); // Connect



  async function loginUser(){

    const queryResponse = await User.query()
    .select('username', 'userID')
    .where('username', username)
    .where('password', password)

    if( queryResponse.length > 0){



      userID = queryResponse[0].userID
      var token = jsonwebtoken.sign({userID:userID, username:req.body.username}, 'Zed') //our secret key should probably be stronger but this ic an remeber for now


      var message = {
        "status":1,
        message:token
      }
      res.send(message)
  
      
    }else{
      message = {
        "status":0,
        message:"wrong credentials"
      }
      res.json(message)
    }
  }
  loginUser();
});
  
  //missing validation
  //  check if user exists 
  //if password correct

  // IF Exist and password correct get ID, username (and everything  thatøs not personal) and put it  into the jsonWebToken
  







//#####################################################
//############### REGISTER A NEW USER #################s
//#####################################################
app.post('/register', (req, res) =>{
  



  //define a new user
  const username = req.body.username
  const password = req.body.password


  //tell me i hit the endpoint
  console.log("i got a request")

    
  const User = require("./models/Users");
    

  // Connect to Database and fetch data with  the id^
  const knex = Knex({
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
      host: "localhost", 
      user: "root",
      password:"", 
      database:"lor"
    }
  });

  const { Model } = require('objection');
  Model.knex(knex); // Connect



async function registerUser(){

  const queryResponse = await User.query()
  .select('username')
  .where('username', username)


  if( queryResponse.length > 0){

    message = {message:"user already exist"}
    res.json(message)

    await knex.destroy()


  }else{
    
    //register
    const response = await User.query()
    .insert({
      "username":username,
      "password":password
    })


    message = {message:"user registred"}
    res.json(message)

    await knex.destroy()

  }


}
registerUser()
})




//#####################################################
//######## Fetches all data in the user TABLE  ########
//#####################################################

app.get('/fetchData', (req, res) =>{

    //define the WEB token
    let jwt = req.header("Authentication")

    // verify with the token
    jsonwebtoken.verify(jwt, 'Zed',async function(err, decoded){
      if(err || decoded == undefined ){
        console.log('Error in JWT');
        res.status(500).json({"error":"Couldn't verify"});
        return;
    }

    //get the userID
    let id = decoded.userID

    
    const User = require("./models/Users");
    

    // Connect to Database and fetch data with  the id^
    const knex = Knex({
      client: 'mysql',
      useNullAsDefault: true,
      connection: {
        host: "localhost", 
        user: "root",
        password:"", 
        database:"lor"
      }
    });
 
    const { Model } = require('objection');
    Model.knex(knex); // Connect


    //delete
    const response = await User.query()
    .select('*')
    .where('userID', id)
    console.log("user loaded")
    console.log(response)
    res.json(response)
    await knex.destroy()


  })

})








//#####################################################
//############ SAVE A DECK ############################
//#####################################################

app.post('/saveDeck', (req, res) =>{

  //get the token
  let jwt = req.header("Authentication")

  // verify it
  jsonwebtoken.verify(jwt, 'Zed', async function(err, decoded){
    if(err || decoded == undefined){
      console.log('Error in JWT');
      res.status(500).json({"error":"Couldn't verify"});
      return;
    }

    //get the data from the request
    let id = decoded.userID
    let deck = req.body.deckCode
    let deckName = req.body.deckName

    //get the model we want to play with
    const Deck = require("./models/Decks");
    

    // Connect to Database and fetch data with  the id^
    const knex = Knex({
      client: 'mysql',
      useNullAsDefault: true,
      connection: {
        host: "localhost", 
        user: "root",
        password:"", 
        database:"lor"
      }
    });
 
    const { Model } = require('objection');
    Model.knex(knex); // Connect
   

      //we want to see if the deck already exists
      const queryResponse = await Deck.query()
      .select('*')
      .where('deckName', deckName)
      .where('userID', id)

     
        //check if the deck already existed or not
        if (queryResponse.length < 1 ) {
  
            const response = await Deck.query().insert({
              userID: id,
              decklist: deck,
              deckName: deckName,
            })
            

            //tell me it saved
            console.log("deck saved");

            //return a message WIP
            res.json({message:"deck saved"})
            await knex.destroy()

        }else{
          
          const response = await Deck.query().patch({
            userID: id,
            decklist: deck,
            deckName: deckName,
          })
          .where('deckName', deckName)
          .where('userID', id)
          .catch(error => { throw error})

          await knex.destroy()
        }
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
  jsonwebtoken.verify(jwt, 'Zed', async function(err, decoded){
    if(err || decoded == undefined){
      console.log('Error in JWT');
      res.status(500).json({"error":"Couldn't verify"});
      return;
    }

    //decode the suer id
    let id = decoded.userID




    
  const Deck = require("./models/Decks");
    

    // Connect to Database and fetch data with  the id^
  
   
    const knex = Knex({
      client: 'mysql',
      useNullAsDefault: true,
      connection: {
        host: "localhost", 
        user: "root",
        password:"", 
        database:"lor"
      }
    });
 
    const { Model } = require('objection');
    Model.knex(knex); // Connect


    //delete
    const response = await Deck.query()
    .select('*')
    .where('userID', id)

    console.log("decks loaded")
    res.json(response)
    await knex.destroy()
  })
})







// #####################################################
// ############### DELETE A DECK #######################
// #####################################################
app.delete('/deleteDeck', (req, res) =>{

  let jwt = req.header("Authentication")
  console.log(jwt)

  // verify the token
  jsonwebtoken.verify(jwt, 'Zed', async function(err, decoded){
    if(err || decoded == undefined){
      console.log('Error in JWT');
      res.status(500).json({"error":"Couldn't verify"});
      return;
    }

    //define the deck and who owns it
    let id = decoded.userID
    let deckName = req.body.deckToBeDeleted


    // Connect to Database and fetch data with  the id^
    const Deck = require("./models/Decks");
    

    // Connect to Database and fetch data with  the id^
    const knex = Knex({
      client: 'mysql',
      useNullAsDefault: true,
      connection: {
        host: "localhost", 
        user: "root",
        password:"", 
        database:"lor"
      }
    });
 
    const { Model } = require('objection');
    Model.knex(knex); // Connect


    //delete
    const response = await Deck.query()
    .delete()
    .where('deckName', deckName)
    .where('userID', id)
    console.log("deck deleted")
    await knex.destroy()
  })
})








app.get( '/createDB', (req,res) => {
  console.log("hi")

  const Knex = require('knex');
  
  // Initialize knex.
  const knex = Knex({
      client: 'mysql',
      useNullAsDefault: true,
      connection: {
        host: "runeterra.cluster-chrlobfittza.eu-west-2.rds.amazonaws.com", 
        user: "Hellwombat",
        password:"K0mpu73r12,", 
        database:"lor"
      }
    });
  
  
  
    knex.raw('CREATE DATABASE lor')
    .then(async function(){
      knex.destroy();
  
    // Create database schema. You should use knex migration files
    // to do this. We create it here for simplicity.
    await knex.schema.createTable('users', table => {
      table.increments('userID').primary();
      table.string('username');
      table.string('password');
      table.string('profileImage');
    });
    await knex.schema.createTable('decks', table => {
      table.integer('userID');
      table.string('decklist');
      table.string('deckName');
    });
  
  
  });
  


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