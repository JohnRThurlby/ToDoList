// Import MySQL connection.
var connection = require("../config/connection.js");

// Methods for MySQL commands
var orm = {

  // selectAll()
  selectAll: function(callback) {

    // Run MySQL Query
    connection.query('SELECT * FROM todolist', function (err, result) {
      if (err) throw err;
      callback(result);
    });

  },

  // insertOne()
  insertOne: function(todoitem, callback){

    

    // Run MySQL Query
    connection.query('INSERT INTO todolist SET ?', {
      todoitem: todoitem,
      tododone: false
    }, function (err, result) {
      if (err) throw err;
      callback(result);
    });

  },

  // updateOne()
  updateOne: function(id, callback){

    // Run MySQL Query
    connection.query('UPDATE todolist SET ? WHERE ?', [{tododone: true}, {id: id}], function (err, result) {
        if (err) throw err;
        callback(result);
      });

  },

  // updateOne()
  deleteOne: function(id, callback){

    // Run MySQL Query
    connection.query('DELETE FROM todolist WHERE ?', [{id: id}], function (err, result) {
        if (err) throw err;
        callback(result);
      });

  }

};



// Export the ORM object in module.exports.
module.exports = orm;
