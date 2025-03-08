// backend/routes/post.routes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyToken = require('../middleware/verifyToken');
const Post = require('../models/post.model');

// Like a post
router.post('/:id/like', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.uid)) {
      post.likes.push(req.user.uid);
      await post.save();
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Comment on a post
router.post('/:id/comment', verifyToken, async (req, res) => {
  const { content } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ userId: req.user.uid, content });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Share a post
router.post('/:id/share', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.shares.includes(req.user.uid)) {
      post.shares.push(req.user.uid);
      await post.save();
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Create a new post with images and videos
router.post('/',  upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]), async (req, res) => {
  const { content, feelings } = req.body;
  const images = req.files['images'] ? req.files['images'].map((file) => file.path) : [];
  const videos = req.files['videos'] ? req.files['videos'].map((file) => file.path) : [];

  const post = new Post({
    userId: req.user.uid,
    content,
    images,
    videos,
    feelings,
  });

  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Delete a post
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.user.uid) { // Only the post owner can delete the post
      await post.remove();
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(403).json({ error: 'Not authorized to delete this post' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;