require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const admin = require('firebase-admin');
const authRoutes = require('./routes/auth.routes');
const forumRoutes = require('./routes/forumRoutes');

// Check if Firebase is already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require('./config/serviceAccountKey.json'))
  });
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logging middleware

// Firebase Auth Middleware
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Ensure imported routes are valid Express routers
if (typeof authRoutes === 'function') {
  app.use('/api/auth', authRoutes);
} else {
  console.error("Error: authRoutes is not a valid Express router.");
}

if (typeof forumRoutes === 'function') {
  app.use('/api/forum', forumRoutes);
} else {
  console.error("Error: forumRoutes is not a valid Express router.");
}

// Protected Route Example
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'Access granted to protected route', user: req.user });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
