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
  arrayRemove, // Import arrayRemove for removing likes
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
      const postsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          // Ensure all required fields exist with defaults
          firstName: data.firstName || "User",
          content: data.content || "",
          feeling: data.feeling || null,
          timestamp: data.timestamp || serverTimestamp(),
          likes: data.likes || 0,
          likedBy: data.likedBy || [],
          commentCount: data.commentCount || 0,
          reshares: data.reshares || 0,
          userId: data.userId || "",
        };
      });
      setPosts(postsData);

      // Initialize likedPosts state
      const user = auth.currentUser;
      if (user) {
        const likedPostsData = {};
        postsData.forEach((post) => {
          if (post.likedBy && post.likedBy.includes(user.uid)) {
            likedPostsData[post.id] = true;
          }
        });
        setLikedPosts(likedPostsData);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle liking/unliking a post
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

      // Ensure the likes and likedBy fields exist
      if (!postData.likes) {
        await updateDoc(postRef, { likes: 0 }); // Initialize likes if it doesn't exist
      }
      if (!postData.likedBy) {
        await updateDoc(postRef, { likedBy: [] }); // Initialize likedBy if it doesn't exist
      }

      // Check if the user has already liked the post
      if (postData.likedBy && postData.likedBy.includes(user.uid)) {
        // User has already liked, so remove the like
        await updateDoc(postRef, {
          likes: increment(-1), // Decrement the like count
          likedBy: arrayRemove(user.uid), // Remove the user's ID from the likedBy array
        });

        // Update the likedPosts state to mark the post as unliked
        setLikedPosts((prev) => ({ ...prev, [postId]: false }));

        console.log("Like removed successfully!");
      } else {
        // User hasn't liked, so add the like
        await updateDoc(postRef, {
          likes: increment(1), // Increment the like count
          likedBy: arrayUnion(user.uid), // Add the user's ID to the likedBy array
        });

        // Update the likedPosts state to mark the post as liked
        setLikedPosts((prev) => ({ ...prev, [postId]: true }));

        console.log("Post liked successfully!");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      Alert.alert("Error", "Failed to toggle like.");
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
  const handleResharePost = async (postId, postContent, postFirstName) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to reshare a post.");
        return;
      }
  
      // Create a new post with a reference to the original post
      await addDoc(collection(db, "forumPosts"), {
        userId: user.uid,
        firstName: user.displayName || "Anonymous", // Use firstName instead of username
        content: `Reshared by ${postFirstName}: ${postContent}`,
        originalPostId: postId,
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
      <TouchableOpacity
        style={styles.createPostButton}
        onPress={navigateToCreatePost}
      >
        <Text style={styles.createPostButtonText}>Create Post</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#182a38" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <View style={styles.header}>
              <Text style={styles.username}>
                  {item.firstName} {/* Changed from username to firstName */}
                </Text>
                {/* Edit/Delete button (only visible to the post owner) */}
                {item.userId === auth.currentUser?.uid && (
                  <TouchableOpacity
                    style={styles.editDeleteButton}
                    onPress={() => showEditDeleteOptions(item.id, item.content)}
                  >
                    <Icon name="more-vertical" size={20} color="#ffffff"></Icon>
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
                    size={26}
                    color={likedPosts[item.id] ? "#79DD09" : "#ffffff"} // Green if liked, white if not
                  />
                  <Text style={[styles.interactionText, { color: likedPosts[item.id] ? "#79DD09" : "#ffffff" }]}>
                    {item.likes || 0} {/* Show the like count */}
                  </Text>
                </TouchableOpacity>

                {/* Comment button */}
                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => navigateToPostDetail(item.id, item.content, item.username)}
                >
                  <Icon name="message-circle" size={26} color="#ffffff"></Icon>
                  <Text style={styles.interactionText}>{item.commentCount || 0}</Text>
                </TouchableOpacity>

                {/* Share button */}
                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => handleShareOrReshare(item.id, item.content, item.firstName)}
                >
                  <Icon name="share-2" size={26} color="#ffffff" />
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
  container: { flexGrow: 1, padding: 10, backgroundColor: "#f5f5f5",paddingBottom: 130, },
  createPostButton: {
    backgroundColor: "#35d0fe",
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
    alignItems: "center",
  },
  createPostButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  post: { backgroundColor: "#182a38", padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  username: { fontWeight: "bold", color: "#ffffff", flex: 1, fontSize: 18 },
  feeling: { marginLeft: 5, color: "#35d0fe", fontSize: 16, fontStyle: "bold" },
  content: { marginTop: 12, color: "#ffffff" },
  timestamp: { marginTop: 5, fontSize: 12, color: "gray" },
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#79DD09",
    paddingTop: 10,
  },
  interactionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  interactionText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#ffffff", // Changed to white
  },
  editDeleteButton: {
    padding: 5,
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  saveButton: {
    backgroundColor: "#79DD09",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ForumScreen;