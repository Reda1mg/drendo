require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kempo_db',
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware: Authenticate & Authorize Token
const authenticateToken = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden
      if (roles.length && !roles.includes(user.role)) return res.sendStatus(403); // Role not allowed
      req.user = user;
      next();
    });
  };
};

// Register Endpoint
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (results.length > 0) return res.status(409).json({ message: 'Username already taken' });

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role],
        (err) => {
          if (err) return res.status(500).json({ message: 'Error registering user' });
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) return res.status(401).send('Invalid credentials');

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid credentials');

    // ✅ Include username in the token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  });
});

// Admin-only route
app.get('/admin', authenticateToken(['ADMIN']), (req, res) => {
  res.send('Welcome, ADMIN user!');
});

// User and Visitor route
app.get('/user', authenticateToken(['USER', 'ADMIN', 'VISITOR']), (req, res) => {
  res.send(`Hello ${req.user.role}, you have access to user area`);
});

// Visitor-only route
app.get('/visitor', authenticateToken(['VISITOR']), (req, res) => {
  res.send('Hello, VISITOR! You have limited access.');
});

// Start Server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
