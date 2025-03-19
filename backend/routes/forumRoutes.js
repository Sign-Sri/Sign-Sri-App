const express = require("express");
const db = require("./../config/firebase-Config");
const router = express.Router();

// Create a new post
router.post("/posts", async (req, res) => {
  try {
    const { userId, content, imageUrl } = req.body;
    const newPost = {
      userId,
      content,
      imageUrl: imageUrl || "",
      timestamp: Date.now(),
      likes: []
    };

    const postRef = await db.collection("posts").add(newPost);
    res.status(201).json({ postId: postRef.id, ...newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all posts
router.get("/posts", async (req, res) => {
    try {
      const postsSnapshot = await db.collection("posts").orderBy("timestamp", "desc").get();
      const posts = postsSnapshot.docs.map(doc => ({ postId: doc.id, ...doc.data() }));
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });