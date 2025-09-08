const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

const createUserTable = async () => {
  try {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NULL,
        phone_verified TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await promisePool.execute(createTableSQL);
    console.log('✅ Users table ready');
  } catch (error) {
    console.error('❌ Error creating users table:', error.message);
  }
};

module.exports = {
  createUser: async (userData) => {
    const { username, email, password, phone = null } = userData;
    const sql = 'INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)';
    const [result] = await promisePool.execute(sql, [username, email, password, phone]);
    return result;
  },

  findUserByEmail: async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await promisePool.execute(sql, [email]);
    return rows[0];
  },

  findUserByUsername: async (username) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await promisePool.execute(sql, [username]);
    return rows[0];
  },

  findUserById: async (id) => {
    const sql = 'SELECT id, username, email, phone, phone_verified, created_at FROM users WHERE id = ?';
    const [rows] = await promisePool.execute(sql, [id]);
    return rows[0];
  },

  findUserByPhone: async (phone) => {
    const sql = 'SELECT * FROM users WHERE phone = ?';
    const [rows] = await promisePool.execute(sql, [phone]);
    return rows[0];
  },

  updateUserPhone: async (userId, phone) => {
    const sql = 'UPDATE users SET phone = ?, phone_verified = 0 WHERE id = ?';
    const [result] = await promisePool.execute(sql, [phone, userId]);
    return result;
  },

  updateUserProfile: async (userId, updateData) => {
    const { username, email, phone } = updateData;
    const sql = 'UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?';
    const [result] = await promisePool.execute(sql, [username, email, phone, userId]);
    return result;
  },

  initialize: createUserTable
};