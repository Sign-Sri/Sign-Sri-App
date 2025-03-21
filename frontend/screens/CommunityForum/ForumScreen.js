import React, { useState, useEffect } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, 
  StyleSheet, Button, Alert, Image 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { 
  collection, query, orderBy, onSnapshot, doc, updateDoc, increment 
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

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
      const postRef = doc(db, "forumPosts", postId);
      await updateDoc(postRef, { likes: increment(1) });
    } catch (error) {
      console.error("Error liking post:", error);
      Alert.alert("Error", "Failed to like the post.");
    }
  };

  // Navigate to CreatePost screen
  const navigateToCreatePost = () => {
    navigation.navigate("CreatePost");
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
            <TouchableOpacity
              style={styles.post}
              onPress={() => navigation.navigate("PostDetail", { postId: item.id })}
            >
              <View style={styles.header}>
                <Image 
                  source={{ uri: item.photoURL || "https://example.com/default-profile.png" }} 
                  style={styles.profilePic} 
                />
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
  header: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  profilePic: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { fontWeight: "bold", color: "#333" },
  feeling: { marginLeft: 5, color: "#555", fontSize: 14, fontStyle: "Bold" }, // Style for feeling text
  content: { marginTop: 5, color: "#555" },
  timestamp: { marginTop: 5, fontSize: 12, color: "gray" },
  likeButton: { padding: 5, marginTop: 5, backgroundColor: "#eee", borderRadius: 5 },
  likeText: { fontSize: 14 },
});

export default ForumScreen;