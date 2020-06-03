const express = require("express")
var mysql      = require('mysql');
import Amplify, { Storage } from 'aws-amplify';

const app = express()







app.get('/', (req, res) => {
  // const customers = [
  //   {id: 1, firstName: 'John', lastName: 'Doe'},
  //   {id: 2, firstName: 'Brad', lastName: 'Traversy'},
  //   {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  // ];
  
  res.header('Access-Control-Allow-Origin', '*');
  // res.json(customers);
  Storage.put('test.txt', 'Hello')
  .then (result => console.log(result)) // {key: "test.txt"}
  .catch(err => console.log(err));


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

app.listen("5000", err => {
  if(err){console.log.log('server cannot listen');return}
  console.log("server is listning")
})


// #####################################################


