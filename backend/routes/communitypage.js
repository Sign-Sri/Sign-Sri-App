const express = require('express');
const router = express.Router();
const admin = require('../config/firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');


const db = admin.firestore();

// Create a new post 
router.post('/createPost',async (req, res) => {
    const { userId, content, mediaUrl } = req.body;
    try{
        const postRef = await db.collection('posts').add ({
            userId,
            content,
            mediaUrl,
            likes: 0,
            comments: [],
            createdAt: new Date()
        });
        res.status(201).send({ id: postRef.id });
    }
    catch (error) {
        res.status(500).send(error);
    }
});

// Like a post
router.post('/likePost',async (req, res) => {
    const { postId } = req.body;
    try{
        const postRef = db.collection('posts').doc(postId);
        await postRef.update({ likes: admin.firestore.FieldValue.increment(1) });
        res.status(200).send({ message: 'Post Liked' });
    }
    catch (error) {
        res.status(500).send(error);
    }
});

// Fetch all posts
router.get('/posts', async (req, res) => {
    try{
        const snapshot = await db.collection('posts').get();
        const posts =[];
        snapshot.forEach(doc => {
            posts.push({ id:doc.id, ...doc.data() })
        });
        res.status(200).json(posts);
    } 
    catch (error) {
        console.error('Erroe fetching posts:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;