// Written by John R. Thurlby May 2018

// Node Dependencies
const express = require('express'),
      router = express.Router(),
      todolist = require('../models/todolist.js')


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
