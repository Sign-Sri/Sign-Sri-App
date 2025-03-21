import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Button,
  Alert,
  Share,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather"; // Use Feather icons
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  increment,
  arrayUnion,
  getDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../config/firebaseConfig";

const ForumScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState({}); // Track liked posts by the current user
  const [editingPostId, setEditingPostId] = useState(null); // Track which post is being edited
  const [editedContent, setEditedContent] = useState(""); // Track edited content
  const navigation = useNavigation();

  // Fetch posts from Firebase
  useEffect(() => {
    const q = query(collection(db, "forumPosts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);

      // Initialize likedPosts state
      const user = auth.currentUser;
      if (user) {
        const likedPostsData = {};
        postsData.forEach((post) => {
          if (post.likedBy && post.likedBy.includes(user.uid)) {
            likedPostsData[post.id] = true; // Mark post as liked by the user
          }
        });
        setLikedPosts(likedPostsData);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle post like
  const handleLike = async (postId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to like a post.");
        return;
      }

      const postRef = doc(db, "forumPosts", postId);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();

      // Check if the user has already liked the post
      if (postData.likedBy && postData.likedBy.includes(user.uid)) {
        Alert.alert("Error", "You have already liked this post.");
        return;
      }

      // Update the likes and likedBy array
      await updateDoc(postRef, {
        likes: increment(1),
        likedBy: arrayUnion(user.uid), // Add the user's ID to the likedBy array
      });

      // Update the likedPosts state to mark the post as liked
      setLikedPosts((prev) => ({ ...prev, [postId]: true }));

      console.log("Post liked successfully!");
    } catch (error) {
      console.error("Error liking post:", error);
      Alert.alert("Error", "Failed to like the post.");
    }
  };

  // Handle editing a post
  const handleEditPost = async (postId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to edit a post.");
        return;
      }

      const postRef = doc(db, "forumPosts", postId);
      await updateDoc(postRef, {
        content: editedContent, // Update the post content
      });

      console.log("Post edited successfully!");
      Alert.alert("Success", "Post edited successfully!");

      // Reset editing state
      setEditingPostId(null);
      setEditedContent("");
    } catch (error) {
      console.error("Error editing post:", error);
      Alert.alert("Error", "Failed to edit the post.");
    }
  };

  // Handle deleting a post
  const handleDeletePost = async (postId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to delete a post.");
        return;
      }

      // Show confirmation dialog
      Alert.alert(
        "Delete Post",
        "Are you sure you want to delete this post?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              const postRef = doc(db, "forumPosts", postId);
              await deleteDoc(postRef); // Delete the post from Firestore
              console.log("Post deleted successfully!");
              Alert.alert("Success", "Post deleted successfully!");
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error("Error deleting post:", error);
      Alert.alert("Error", "Failed to delete the post.");
    }
  };

  // Show edit/delete options when the user clicks the icon
  const showEditDeleteOptions = (postId, postContent) => {
    Alert.alert(
      "Options",
      "Choose an action:",
      [
        {
          text: "Edit",
          onPress: () => {
            setEditingPostId(postId); // Set the post ID being edited
            setEditedContent(postContent); // Pre-fill the input with the current content
          },
        },
        {
          text: "Delete",
          onPress: () => handleDeletePost(postId),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Handle sharing or resharing a post
  const handleShareOrReshare = async (postId, postContent, postUsername) => {
    Alert.alert(
      "Share or Reshare",
      "Choose an option:",
      [
        {
          text: "Share",
          onPress: () => handleSharePost(postId),
        },
        {
          text: "Reshare",
          onPress: () => handleResharePost(postId, postContent, postUsername),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Handle sharing a post (generate a shareable link)
  const handleSharePost = async (postId) => {
    try {
      // Generate a shareable link
      const shareableLink = `https://yourapp.com/posts/${postId}`; // Replace with your app's domain

      // Use React Native's Share API to share the link
      await Share.share({
        message: `Check out this post: ${shareableLink}`,
        title: "Share Post",
      });

      console.log("Post shared successfully!");
    } catch (error) {
      console.error("Error sharing post:", error);
      Alert.alert("Error", "Failed to share the post.");
    }
  };

  // Handle resharing a post
  const handleResharePost = async (postId, postContent, postUsername) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to reshare a post.");
        return;
      }

      // Create a new post with a reference to the original post
      await addDoc(collection(db, "forumPosts"), {
        userId: user.uid,
        username: user.displayName || "Anonymous",
        content: `Reshared: ${postContent}`,
        originalPostId: postId, // Reference to the original post
        timestamp: serverTimestamp(),
        likes: 0,
        likedBy: [],
        commentCount: 0,
      });

      // Increment the reshares count for the original post
      const postRef = doc(db, "forumPosts", postId);
      await updateDoc(postRef, {
        reshares: increment(1),
      });

      console.log("Post reshared successfully!");
      Alert.alert("Success", "Post reshared successfully!");
    } catch (error) {
      console.error("Error resharing post:", error);
      Alert.alert("Error", "Failed to reshare the post.");
    }
  };

  // Navigate to CreatePost screen
  const navigateToCreatePost = () => {
    navigation.navigate("CreatePost");
  };

  // Navigate to PostDetail screen
  const navigateToPostDetail = (postId, postContent, postUsername) => {
    navigation.navigate("PostDetail", {
      postId,
      postContent,
      postUsername,
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Create Post"
        onPress={navigateToCreatePost}
        style={styles.createPostButton}
      />

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <View style={styles.header}>
                <Text style={styles.username}>
                  {item.username || `User: ${item.userId || "Unknown"}`}
                </Text>
                {/* Edit/Delete button (only visible to the post owner) */}
                {item.userId === auth.currentUser?.uid && (
                  <TouchableOpacity
                    style={styles.editDeleteButton}
                    onPress={() => showEditDeleteOptions(item.id, item.content)}
                  >
                    <Icon name="more-vertical" size={20} color="#666" />
                  </TouchableOpacity>
                )}
              </View>
              {/* Display the feeling if it exists */}
              {item.feeling && (
                <Text style={styles.feeling}>Feeling {item.feeling}</Text>
              )}
              {/* Show input field if the post is being edited */}
              {editingPostId === item.id ? (
                <TextInput
                  style={styles.editInput}
                  value={editedContent}
                  onChangeText={setEditedContent}
                  placeholder="Edit your post..."
                  multiline
                />
              ) : (
                <Text style={styles.content}>{item.content || "No content available"}</Text>
              )}
              <Text style={styles.timestamp}>
                {item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleString() : "N/A"}
              </Text>

              {/* Interaction buttons in one line */}
              <View style={styles.interactionContainer}>
                {/* Like button with hand icon */}
                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => handleLike(item.id)}
                >
                  <Icon
                    name="thumbs-up"
                    size={20}
                    color={likedPosts[item.id] ? "green" : "#666"} // Change color to green if liked
                  />
                  <Text style={[styles.interactionText, { color: likedPosts[item.id] ? "green" : "#666" }]}>
                    {item.likes || 0}
                  </Text>
                </TouchableOpacity>

                {/* Comment button */}
                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => navigateToPostDetail(item.id, item.content, item.username)}
                >
                  <Icon name="message-circle" size={20} color="#666" />
                  <Text style={styles.interactionText}>{item.commentCount || 0}</Text>
                </TouchableOpacity>

                {/* Share button */}
                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => handleShareOrReshare(item.id, item.content, item.username)}
                >
                  <Icon name="share-2" size={20} color="#666" />
                  <Text style={styles.interactionText}>{item.reshares || 0}</Text>
                </TouchableOpacity>
              </View>

              {/* Save button for editing */}
              {editingPostId === item.id && (
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => handleEditPost(item.id)}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  createPostButton: { backgroundColor: "blue", padding: 10, borderRadius: 5, marginBottom: 10 },
  post: { backgroundColor: "#fff", padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  username: { fontWeight: "bold", color: "#333", flex: 1 },
  feeling: { marginLeft: 5, color: "#555", fontSize: 14, fontStyle: "bold" },
  content: { marginTop: 5, color: "#555" },
  timestamp: { marginTop: 5, fontSize: 12, color: "gray" },
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  interactionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  interactionText: {
    marginLeft: 5,
    fontSize: 14,
  },
  editDeleteButton: {
    padding: 5,
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ForumScreen;