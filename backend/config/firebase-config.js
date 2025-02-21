const admin = require('firebase-admin');
const serviceAccount = require('./sign-sri-123-firebase-adminsdk-fbsvc-08844b9a46.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;