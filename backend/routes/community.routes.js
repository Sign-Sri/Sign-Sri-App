const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Create Post
router.post('/posts', async (req, res) => {
  try {
    const post = {
      userId: req.user.uid,
      content: req.body.content,
      images: req.body.images || [],
      videos: req.body.videos || [],
      feeling: req.body.feeling || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection('posts').add(post);
    res.status(201).json({ id: docRef.id, ...post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Posts
router.get('/posts', async (req, res) => {
  try {
    const snapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
    const posts = [];
    snapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add more routes for comments, likes, etc.

module.exports = router;