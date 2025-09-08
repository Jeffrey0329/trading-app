const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const User = require('./models/User.model');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`📨 Request received: ${req.method} ${req.url}`);
  next();
});

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Failed to connect MySQL Database:', err.message);
  } else {
    console.log('✅ Connected to MySQL Database');
    connection.release();
    User.initialize();
  }
});

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`🚀 Backend server running at http://localhost:${port}`);
});