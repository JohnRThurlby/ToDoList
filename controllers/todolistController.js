// Written by John R. Thurlby May 2018

// Node Dependencies
require("dotenv").config()
const express = require('express'),
//      keys = require("../config/keys.js"),      
      router = express.Router(),
      todolist = require('../models/todolist.js')
       
var twilio = require('twilio');

if (process.env.NODE_ENV != "PRODUCTION") {
  var client = new twilio(process.env.accountsid, process.env.authtoken);
}
else {
  var client = new twilio();
}


var PhoneNumber = require( 'awesome-phonenumber' );

var phoneText = " "

// Create routes
// ----------------------------------------------------
// Index Redirect
router.get('/', function (req, res) {
  res.redirect('/index')
})

// Index Page (render all todolists to DOM)
router.get('/index', function (req, res) {

  todolist.selectAll(function(data) {
    var hbsObject = { todolist: data }
    
    res.render('index', hbsObject)
  })
})

// Create a todolist
router.post('/todolist', function (req, res) {
  console.log(req.body.phonenum)
  

  var pn = new PhoneNumber( req.body.phonenum, 'US' );
  if (pn.isValid()) {
    phoneText = "+1" + req.body.phonenum

    console.log("phoneText " + phoneText)

    client.messages.create({
      body: req.body.todoitem,
      to: phoneText,  // Text this number
      from: '+16093164815' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));

  }
  else {
          
  }
  
  todolist.insertOne(req.body.todoitem, function() {
    res.redirect('/index')
  })
})

// update a todolist to set it to complete, boolean = true
router.post('/todolist/update/:id', function (req, res) {

    todolist.updateOne(req.params.id, function() {
    res.redirect('/index')
  })
})

// remove a todolist
router.post('/todolist/delete/:id', function (req, res) {

  todolist.deleteOne(req.params.id, function() {
    res.redirect('/index')
  })
})

// Export routes
module.exports = router
