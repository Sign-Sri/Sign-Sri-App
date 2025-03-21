import React, { useEffect, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert
} from "react-native";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { useRoute } from "@react-navigation/native";

const PostDetailScreen = () => {
  const route = useRoute();
  const { postId, postContent, postUsername } = route.params;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch comments for the post
  useEffect(() => {
    const q = query(collection(db, "forumPosts", postId, "comments"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, [postId]);

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!comment.trim()) {
      Alert.alert("Error", "Comment cannot be empty.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to comment.");
        return;
      }

      // Add the new comment to the "comments" subcollection
      await addDoc(collection(db, "forumPosts", postId, "comments"), {
        userId: user.uid,
        username: user.displayName || "Anonymous",
        comment: comment,
        timestamp: serverTimestamp(),
      });

      // Increment the commentCount in the post document
      const postRef = doc(db, "forumPosts", postId);
      await updateDoc(postRef, {
        commentCount: increment(1), // Increment the comment count
      });

      setComment(""); // Clear input after posting
    } catch (error) {
      console.error("Error adding comment:", error);
      Alert.alert("Error", "Failed to add comment.");
    }
  };

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <View style={styles.container}>
      <Text style={styles.postTitle}>{postUsername}:</Text>
      <Text style={styles.postContent}>{postContent}</Text>

      {/* Display comments */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <Text style={styles.commentUser}>{item.username}:</Text>
            <Text>{item.comment}</Text>
          </View>
        )}
      />

      {/* Add a new comment */}
      <TextInput
        style={styles.input}
        placeholder="Write a comment..."
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
        <Text style={styles.buttonText}>Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  postTitle: { fontWeight: "bold", fontSize: 18 },
  postContent: { fontSize: 16, marginBottom: 10 },
  commentBox: { borderBottomWidth: 1, padding: 5, marginBottom: 5 },
  commentUser: { fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginTop: 10 },
  commentButton: { backgroundColor: "blue", padding: 10, marginTop: 10, borderRadius: 5 },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
});

export default PostDetailScreen;