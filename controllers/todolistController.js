// Node Dependencies
var express = require('express');
var router = express.Router();
var todolist = require('../models/todolist.js');


// Create routes
// ----------------------------------------------------
// Index Redirect
router.get('/', function (req, res) {
  res.redirect('/index');
});


// Index Page (render all todolists to DOM)
router.get('/index', function (req, res) {
  todolist.selectAll(function(data) {
    var hbsObject = { todolist: data };
    //console.log(hbsObject);
    res.render('index', hbsObject);
  });
});


// Create a todolist
router.post('/todolist', function (req, res) {
  todolist.insertOne(req.body.todoitem, function() {
    res.redirect('/index');
  });
});


// complete a todolist
router.post('/todolist/update/:id', function (req, res) {
  console.log("in todolist update " + req.params.id)
  todolist.updateOne(req.params.id, function() {
    res.redirect('/index');
  });
});
// ----------------------------------------------------
// remove a todolist
router.post('/todolist/delete/:id', function (req, res) {
  todolist.deleteOne(req.params.id, function() {
    res.redirect('/index');
  });
});

// Export routes
module.exports = router;
