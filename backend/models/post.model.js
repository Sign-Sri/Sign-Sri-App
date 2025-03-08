// backend/models/post.model.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  images: [String],
  videos: [String],
  likes: [{ type: String }], // Array of user IDs who liked the post
  comments: [{
    userId: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
  }],
  shares: [{ type: String }], // Array of user IDs who shared the post
  feelings: { type: String, enum: ['happy', 'sad', 'emotional', 'celebrate', 'angry', 'excited', 'grateful', 'other'], default: 'happy' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);