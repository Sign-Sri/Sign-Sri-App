const express = require('express');
const router = express.Router();
const admin = require("../config/firebase-config");
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
router.post('/signup', validateSignUp, async (req, res) => {
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
  
      // Store additional user data in your database if needed
      // You might want to create a users collection in Firestore
  
      res.status(201).json({
        message: 'User created successfully',
        userId: userRecord.uid
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: error.message });
    }
  });
  module.exports = router;
  