const mysql = require('mysql2');
const Connection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express-sql'
});

Connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = {
    Connection
};