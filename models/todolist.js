// Written by John R. Thurlby May 2018

// Import the ORM to create functions that will interact with the database.
// Node Dependency
const orm = require('../config/orm.js')


// create the code that will call the ORM functions using todolist specific input for the ORM.
var todolist = {

  // get all todolists
  selectAll: function(callback){

    orm.selectAll(function(res){
      callback(res)
    })
  },

  // insert a new todolist
  insertOne: function(todoitem, callback){

    orm.insertOne(todoitem, function(res){
      callback(res)
    })
  },

  // update an existing todolist
  updateOne: function(id, callback){

    orm.updateOne(id, function(res){
      callback(res)
    })
  },

  // delete a completed todolist
  deleteOne: function(id, callback){

    orm.deleteOne(id, function(res){
      callback(res);
    })
  }


}


// Export the database functions for the controller (todolistController.js).
module.exports = todolist

