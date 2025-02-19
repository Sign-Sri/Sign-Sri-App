const express = require("express");
const { admin, db } = require("../firebase");

const router = express.Router();

// Sign Up User
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    // Create user in Firebase Authentication
    const user = await admin.auth().createUser({
      email,
      password,
      phoneNumber,
    });

    // Store additional user data in Firestore
    await db.collection("users").doc(user.uid).set({
      firstName,
      lastName,
      email,
      phoneNumber,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
