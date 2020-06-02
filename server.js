const express = require("express")
// const session = require("express-session")
// const cors = require('cors')
const app = express()

// app.use(cors())
// const TWO_HOURS = 1000 * 60 * 60 * 2

// const{
//   // PORT = 8080,
//   NODE_ENV = 'development',

//   SESS_NAME = 'sid',
//   SESS_SECRET = 'secret',
//   SESS_LIFETIME = TWO_HOURS
// } = process.env

// const IN_PROD = NODE_ENV === 'production'

// app.use(session({
//   name: SESS_NAME,
//   resave: false,
//   saveUninitialized: false,
//   secret: SESS_SECRET,
//   cookie:{
//     maxAge: SESS_LIFETIME,
//     sameSite: true,
//     secure: IN_PROD
//   }
// }))




app.get('/', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];
  
  res.header('Access-Control-Allow-Origin', '*');
  res.json(customers);
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

})
app.get('/register', (req, res) =>{

})
//#####################################################

app.listen("80", err => {
  if(err){console.log.log('server cannot listen');return}
  console.log("server is listning")
})


// #####################################################


