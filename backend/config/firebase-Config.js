const admin = require("firebase-admin");
const path = require("path");

// Load the Firebase credentials securely
const serviceAccount = require(path.join(__dirname, "firebase-service-account.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sign-sri-123.firebaseio.com"  // Replace with your Firebase DB URL
});

module.exports = admin;
