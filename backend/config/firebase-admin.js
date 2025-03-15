// backend/config/firebase-admin.js
const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json'); // Path to your service account key

// Initialize Firebase Admin SDK (if not already initialized)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sign-sri-123.firebaseio.com', // Replace with your Firebase database URL
  });
}

module.exports = admin; // Export the initialized Firebase Admin SDK