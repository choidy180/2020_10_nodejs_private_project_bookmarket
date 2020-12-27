const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "db_homework",
});

module.exports = pool;
