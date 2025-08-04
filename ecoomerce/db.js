const mysql = require('mysql2');

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'ecommerce'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL!');
});

module.exports = connection;
