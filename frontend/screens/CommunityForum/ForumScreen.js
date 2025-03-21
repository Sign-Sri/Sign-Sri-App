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
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../config/firebaseConfig";

const ForumScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Fetch posts from Firebase
  useEffect(() => {
    const q = query(collection(db, "forumPosts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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

      console.log("Post liked successfully!");
    } catch (error) {
      console.error("Error liking post:", error);
      Alert.alert("Error", "Failed to like the post.");
    }
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
              </View>
              {/* Display the feeling if it exists */}
              {item.feeling && (
                <Text style={styles.feeling}>Feeling {item.feeling}</Text>
              )}
              <Text style={styles.content}>{item.content || "No content available"}</Text>

              <Text style={styles.timestamp}>
                {item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleString() : "N/A"}
              </Text>

              {/* Interaction buttons in one line */}
              <View style={styles.interactionContainer}>
                {/* Like button */}
                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => handleLike(item.id)}
                >
                  <Icon name="thumbs-up" size={20} color="#666" />
                  <Text style={styles.interactionText}>{item.likes || 0}</Text>
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
  username: { fontWeight: "bold", color: "#333" },
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
    color: "#666",
    fontSize: 14,
  },
});

export default ForumScreen;