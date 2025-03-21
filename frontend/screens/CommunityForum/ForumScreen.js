import React, { useState, useEffect } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, 
  StyleSheet, Button, Alert, Image, TextInput, Modal 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { 
  collection, query, orderBy, onSnapshot, doc, updateDoc, increment 
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

const predefinedFeelings = [
  "😊 Happy", "🎉 Celebrate", "😞 Disappointment", 
  "❤️ Love", "😡 Angry", "😢 Sad", "🎂 Birthday", "Other+"
];

const ForumScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customFeeling, setCustomFeeling] = useState("");
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  // Handle custom feeling submission
  const handleCustomFeeling = () => {
    if (customFeeling.trim()) {
      setSelectedFeeling(customFeeling);
      setIsModalVisible(false);
    }
  };

  // Navigate to CreatePost screen
  const navigateToCreatePost = () => {
    if (selectedFeeling) {
      navigation.navigate("CreatePost", { feeling: selectedFeeling });
    } else {
      Alert.alert("Error", "Please select a feeling before creating a post.");
    }
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
                {item.feeling && <Text style={styles.feeling}>{item.feeling}</Text>}
              </View>
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

      {/* Modal for entering a custom feeling */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Enter your custom feeling:</Text>
          <TextInput
            style={styles.input}
            placeholder="Feeling..."
            value={customFeeling}
            onChangeText={setCustomFeeling}
          />
          <Button title="Submit" onPress={handleCustomFeeling} />
        </View>
      </Modal>
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
  feeling: { marginLeft: 5, color: "#555", fontSize: 14 },
  content: { marginTop: 5, color: "#555" },
  timestamp: { marginTop: 5, fontSize: 12, color: "gray" },
  likeButton: { padding: 5, marginTop: 5, backgroundColor: "#eee", borderRadius: 5 },
  likeText: { fontSize: 14 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  input: { backgroundColor: "#fff", padding: 10, margin: 20, width: "80%", borderRadius: 5 },
});

export default ForumScreen;