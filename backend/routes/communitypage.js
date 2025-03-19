const express = require ("express");
const router = express.Router();
const admin = require('../config/firebase-admin');
const db = admin.firestore();
const authMiddleware = require('../middleware/auth');

// Get all posts in the community forum
router.get('/posts', async (req, res) =>{
    try {
        const postsSnapshot = await db.collection('communityPosts')
        .orderBy('createdAt', 'desc')
        .get();

        const posts = [];
        postsSnapshot.forEach(doc => {
            posts.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error : 'Failed to fetch posts' });
    }

});

// Create a new post 
router.post('/posts', authMiddleware, async (req, res) => {
    try{
        const userId = req.user.uid;
        const { firstName, lastName, content, title } = req.body;
        
        if (  !firstName || !lastName ||!content ||!title) {
            return res.status(400).json({error: 'Missing required fields' });
        }
        
        const newPost = {
            userId,
            firstName,
            lastName,
            title,
            content,
            likes: 0,
            Comments: [],
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('communityPosts').add(newPost);

        res.status(201).json({
            id: docRef.id,
            ...newPost
        });
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// Get a specific post with its comments
router.get('/posts/:postId', async (req, res) => {
    try { 
        const postId = req.params.postId;
        const postDoc = await db.collection('communityPosts').doc(postId).get();
        
        if(!postDoc.exists) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const post = {
            id: postDoc.id,
            ...postDoc.data()
        };

        res.status(200).json(post);
    } catch (error) {
        console.error('Error Fetching Post:', error);
        res.status(500).json({error: 'Failed to fetch post' })
    }
});


// Add a comment to a post 
router.post('/posts/:postId/comments', async (req, res) => {
    try{
        const postId = req.params.postId;
        const { uid, firstName, lastName, content } = req.body;

        if (!uid || !firstName || !lastName || !content) {
            return res.status(400).json({ error : 'Missing required fields'});
        }

        const newComment = {
            uid,
            firstName,
            lastName,
            content,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('communityPosts').doc(postId).update({
            comments: admin.firestore.FieldValue.arrayUnion(newComment)
        });

        res.status(201).json(newComment);
    }catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

//Like a post 
router.post('/posts/:postId/like', async (req, res) => {
    try{
        const postId = req.params.postId;
        const { uid } = req.body;

        if (!uid) {
            return res.status(400).json({ error: 'Missing userId' });
        }

        // Check if user already liked the post 
        const likeDoc =  await db.collection('likes')
        .where('postsId', '==', postId)
        .where('uid', '==', uid)
        .get();

        if(!likeDoc.empty) {
            return res.status(400).json({ error: 'User already liked this post' } );
        }

        // Add like record 
        await db.collection('likes').add({
            postId,
            uid,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        //Increment post likes coumt 
        await  db.collection('communityPosts').doc(postId).update({
            likes: admin.firestore.FieldValue.increment(1)
        });
        res.status(200).json({ message: 'Post likes successfully' });
    }
    catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ error: 'Failed to like post' });
    }
});

module.exports = router;