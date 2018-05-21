DROP DATABASE IF EXISTS todolist_db;
CREATE DATABASE todolist_db;
USE todolist_db;

CREATE TABLE todolist(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  PRIMARY KEY (id),
  todoitem VARCHAR(255) NOT NULL,
  tododone BOOLEAN DEFAULT false,
  phonenumber VARCHAR(12),
  textdate VARCHAR(10),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
  );





