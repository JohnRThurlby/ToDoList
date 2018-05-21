// Written by John R. Thurlby May 2018

// Node Dependencies
require("dotenv").config()
const express = require('express'),
      router = express.Router(),
      todolist = require('../models/todolist.js'),
      PhoneNumber = require( 'awesome-phonenumber' )
       
var twilio = require('twilio');

if (process.env.NODE_ENV != "PRODUCTION") {
  var client = new twilio(process.env.accountsid, process.env.authtoken);
}
else {
  var client = new twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);
}

var phoneText = " "

var currentDate = new Date();

var date = currentDate.getDate();
var month = currentDate.getMonth(); //Be careful! January is 0 not 1
var year = currentDate.getFullYear();

if (month < 9) {
   var dateString = year + "-0" +(month + 1) + "-" + date;
  } 
  else {
    var dateString = year + "-" +(month + 1) + "-" + date;
  }

deliverText()

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
  req.body.textsent = false
  var pn = new PhoneNumber( req.body.phonenum, 'US' );
  if (pn.isValid()) {
    phoneText = "+1" + req.body.phonenum

    req.body.phonenum = phoneText
    
  }
  else {
    req.body.phonenum = 9999999999
  } 
  //If text date is not entered, then send text right away
  if (req.body.textdate == "" && req.body.phonenum != 9999999999) {
    
    req.body.textdate = null
    req.body.textsent = true
    
    client.messages.create({
      body: req.body.todoitem,
      to: phoneText,  // Text this number
      from: '+16093164815' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
     
  }
    
  todolist.insertOne(req.body, function() {
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

function deliverText(){
  todolist.selectAll(function(data) {
    
    for (i = 0; i < data.length; i++){
      
      if (data[i].textdate == dateString && !data[i].textsent){
                
        client.messages.create({
          body: data[i].todoitem,
          to: data[i].phonenumber,  // Text this number
          from: '+16093164815' // From a valid Twilio number
        })
        .then((message) => console.log(message.sid))
                 
        todolist.updateText(data[i].id, function() {
        })
      }
    }
  })
}
// Export routes
module.exports = router
