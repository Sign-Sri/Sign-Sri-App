// routes/auth.routes.js
const express = require('express');
const auth = express.Router(); // Create the router
const admin = require('../config/firebase-config');
const { body, validationResult } = require('express-validator');

// Validation middleware
const validateSignUp = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('phoneNumber').trim().notEmpty().withMessage('Phone number is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// Sign Up Route
auth.post('/signup', validateSignUp, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, phoneNumber } = req.body;

    // Create user in Firebase
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      phoneNumber: phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`,
    });

    res.status(201).json({
      message: 'User created successfully',
      userId: userRecord.uid
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Sign In Route
auth.post('/signin', async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.json({ userId: decodedToken.uid });
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

// Password Reset Route
auth.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    await admin.auth().generatePasswordResetLink(email);
    res.json({ message: 'Password reset link sent successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Email Verification Route
auth.post('/verify-email', async (req, res) => {
  try {
    const { email } = req.body;
    await admin.auth().generateEmailVerificationLink(email);
    res.json({ message: 'Verification email sent successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { auth }; // Export the router