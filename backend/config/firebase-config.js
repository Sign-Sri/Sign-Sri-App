const admin = require("firebase-admin");

const serviceAccount = require("./sign-sri-123-firebase-adminsdk-fbsvc-ae42f0a14d (2).json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sign-sri-123.firebaseio.com',
});

