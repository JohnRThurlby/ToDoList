// Import the ORM to create functions that will interact with the database.
// Node Dependency
var orm = require('../config/orm.js');


// create the code that will call the ORM functions using burger specific input for the ORM.
var todolist = {

  selectAll: function(callback){
    orm.selectAll(function(res){
      callback(res);
    });
  },

  insertOne: function(todoitem, callback){
    orm.insertOne(todoitem, function(res){
      callback(res);
    });
  },

  updateOne: function(id, callback){
    orm.updateOne(id, function(res){
      callback(res);
    });
  },

  deleteOne: function(id, callback){
    orm.deleteOne(id, function(res){
      callback(res);
    });
  }


};


// Export the database functions for the controller (todolistController.js).
module.exports = todolist;

