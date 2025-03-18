const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account.json"); // ✅ Check this path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
