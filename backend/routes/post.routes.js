// backend/routes/post.routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Post = require('../models/post.model');

// Create a new post
router.post('/', verifyToken, async (req, res) => {
  const { content, images, videos, feelings } = req.body;
  const post = new Post({
    userId: req.user.uid,
    content,
    images,
    videos,
    feelings
  });

  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all posts with sorting and filtering
router.get('/', verifyToken, async (req, res) => {
  const { sortBy, feeling } = req.query;
  let sortCriteria = {};
  let filterCriteria = {};

  switch (sortBy) {
    case 'likes':
      sortCriteria = { likes: -1 };
      break;
    case 'comments':
      sortCriteria = { 'comments.length': -1 };
      break;
    case 'date':
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  if (feeling) {
    filterCriteria = { feelings: feeling };
  }

  try {
    const posts = await Post.find(filterCriteria).sort(sortCriteria);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;