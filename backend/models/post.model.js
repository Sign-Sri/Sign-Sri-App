const { db } = require("../config/firebase-config"); // Import Firestore from your Firebase config
const { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } = require("firebase/firestore");

const postsCollection = collection(db, "posts"); // Reference to the "posts" collection

// Create a new post
const createPost = async (postData) => {
  try {
    const newPostRef = await addDoc(postsCollection, {
      userId: postData.userId,
      content: postData.content,
      images: postData.images || [],
      videos: postData.videos || [],
      likes: [],
      comments: [],
      shares: [],
      feelings: postData.feelings || "happy",
      createdAt: new Date(),
    });
    return { id: newPostRef.id, ...postData };
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Get all posts
const getAllPosts = async () => {
  try {
    const snapshot = await getDocs(postsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Get a post by ID
const getPostById = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postSnapshot = await getDoc(postRef);

    if (!postSnapshot.exists()) {
      throw new Error("Post not found");
    }

    return { id: postSnapshot.id, ...postSnapshot.data() };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

// Update a post
const updatePost = async (postId, updatedData) => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, updatedData);
    return { id: postId, ...updatedData };
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// Delete a post
const deletePost = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
    return { message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
