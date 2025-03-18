const express = require("express");
const admin = require("../config/firebase-Config"); // Import Firebase


const router = express.Router();

// Example: Protected route
router.post("/createPost", async (req, res) => {
  try {
    const { uid, content } = req.body;

    if (!uid || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = admin.firestore();
    await db.collection("posts").add({
      uid,
      content,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
