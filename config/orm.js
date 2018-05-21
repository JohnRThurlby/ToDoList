// Written by John R. Thurlby May 2018

// Import MySQL connection.
const connection = require("../config/connection.js")

// Methods for MySQL commands
var orm = {

  // selectAll(), get all todo lists
  selectAll: function(callback) {

    // Run MySQL Query
    connection.query('SELECT * FROM todolist', function (err, result) {
      if (err) throw err
      callback(result)
    })
  },

  // insertOne(), add a new to do list
  insertOne: function(body, callback){
    console.log(body)
    console.log(body.phonenum)
    // Run MySQL Query
    connection.query('INSERT INTO todolist SET ?', {
      todoitem: body.todoitem,
      tododone: false,
      phonenumber: body.phonenum,
      textdate: body.textdate
    }, function (err, result) {
      if (err) throw err
      callback(result)
    })
  },

  // updateOne(), update an existing to do list, set boolean to true
  updateOne: function(id, callback){

    // Run MySQL Query
    connection.query('UPDATE todolist SET ? WHERE ?', [{tododone: true}, {id: id}], function (err, result) {
        if (err) throw err
        callback(result)
      })
  },

  // deleteOne(), remove a completed to do list
  deleteOne: function(id, callback){

    // Run MySQL Query
    connection.query('DELETE FROM todolist WHERE ?', [{id: id}], function (err, result) {
        if (err) throw err
        callback(result)
      })
  }
}



// Export the ORM object in module.exports.
module.exports = orm;
