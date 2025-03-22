const admin = require("firebase-admin");

// Check if Firebase is already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(require("./serviceAccountKey.json")),
        databaseURL: "https://sign-sri-123.firebaseio.com",
    });
}

module.exports = admin;
