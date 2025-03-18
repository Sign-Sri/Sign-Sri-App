const express = require("express");
const admin = require("../config/firebase-config");
const cors = require("cors");
const app = express();
const port = 5000;

const router = express.Router();

router.use(express.json());
router.use(cors()); // Allow requests from the frontend

// Create a new post
router.post("/createPost", async (req, res) => {
    try {
        const { uid, firstName, lastName, content, imageUrl } = req.body;

        if (!uid || !content || !firstName || !lastName) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const db = admin.firestore();
        const postRef = await db.collection("posts").add({
            uid,
            firstName,
            lastName,
            content,
            imageUrl,
            likes: 0, // Initialize likes count
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).json({ id: postRef.id, message: "Post created successfully" });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all posts
router.get("/getPosts", async (req, res) => {
    try {
        const db = admin.firestore();
        const snapshot = await db.collection("posts").orderBy("createdAt", "desc").get();
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(posts); // Return the list of posts
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Like a post
router.post("/likePost", async (req, res) => {
    const { postId } = req.body;

    if (!postId) {
        return res.status(400).json({ error: "Post ID is required" });
    }

    try {
        const db = admin.firestore();
        const postRef = db.collection("posts").doc(postId);
        const post = await postRef.get();

        if (!post.exists) {
            return res.status(404).json({ error: "Post not found" });
        }

        const postData = post.data();
        const newLikesCount = (postData.likes || 0) + 1;
        await postRef.update({ likes: newLikesCount });
        res.json({ id: postId, likes: newLikesCount });
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;