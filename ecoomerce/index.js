const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // 🔹 import cors

const app = express();

// ✅ Enable CORS for all routes
app.use(cors());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234', // your MySQL password
  database: 'ecommerce'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users')(connection));
app.use('/orders', require('./routes/orders')(connection));


// Start server
app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});
