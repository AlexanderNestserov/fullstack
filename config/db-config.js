const mysql = require('mysql2');
const key = require("./keys");

const db = mysql.createConnection(key.mysqlConfig);
module.exports = db;
