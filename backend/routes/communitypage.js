const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://sign-sri-123.firebaseio.com'
});

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