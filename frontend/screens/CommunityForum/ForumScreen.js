import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

const ForumScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Fetch posts from Firebase
  const fetchPostsFirebase = () => {
    const q = query(collection(db, "forumPosts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchPostsFirebase();
    return () => unsubscribe();
  }, []);

  // Handle post like
  const handleLike = async (postId) => {
    try {
      const postRef = doc(db, "forumPosts", postId);
      await updateDoc(postRef, {
        likes: increment(1),
      });
    } catch (error) {
      console.error("Error liking post:", error);
      Alert.alert("Error", "Failed to like the post.");
    }
  };

  // Navigate to CreatePost screen
  const navigateToCreatePost = () => {
    navigation.navigate("Create Post");
  };

  return (
    <View style={styles.container}>
      <Button title="Create Post" onPress={navigateToCreatePost} style={styles.createPostButton} />
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id || item.postId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.post}
              onPress={() => navigation.navigate("PostDetail", { postId: item.id || item.postId })}
            >
              <Text style={styles.username}>{item.username || `User: ${item.userId}`}</Text>
              <Text style={styles.content}>{item.content}</Text>
              <Text style={styles.timestamp}>
                {item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleString() : "N/A"}
              </Text>
              <TouchableOpacity style={styles.likeButton} onPress={() => handleLike(item.id)}>
                <Text style={styles.likeText}>👍 {item.likes || 0}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
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
  username: { fontWeight: "bold", color: "#333" },
  content: { marginTop: 5, color: "#555" },
  timestamp: { marginTop: 5, fontSize: 12, color: "gray" },
  likeButton: { padding: 5, marginTop: 5, backgroundColor: "#eee", borderRadius: 5 },
  likeText: { fontSize: 14 },
});

export default ForumScreen;
