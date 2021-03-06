// Written by John R. Thurlby May 2018

// Set up MySQL connection.
require("dotenv").config()
// const keys = require("./keys.js"),
const mysql = require("mysql") 
//      mysqlPass = keys.sqlAccess

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
  connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.sql_Password,
  database: "todolist_db"
})
}

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack)
    return
  }
  console.log("connected as id " + connection.threadId)
})

// Export connection for our ORM to use.
module.exports = connection
