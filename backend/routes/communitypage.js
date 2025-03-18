const express = require("express");
const admin = require("../config/firebaseConfig");  // Import Firebase config

const router = express.Router();

// Example: Middleware to verify Firebase JWT tokens
async function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;  // Attach user info to request
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
}

// Example: Protected route
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route!", user: req.user });
});

module.exports = router;
