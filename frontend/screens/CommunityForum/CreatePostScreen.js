import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

const CreatePostScreen = () => {
  const [content, setContent] = useState("");
  const navigation = useNavigation();

  // Function to handle post creation using Firebase
  const handleCreatePostFirebase = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Post content cannot be empty.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to post.");
        return;
      }

      await addDoc(collection(db, "forumPosts"), {
        userId: user.uid,
        content: content,
        timestamp: serverTimestamp(),
      });

      Alert.alert("Success", "Post created!");
      navigation.goBack();
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post.");
    }
  };

  // Function to handle post creation using Axios
  const handleCreatePostAxios = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Post content cannot be empty.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/forum/posts", {
        userId: "testUser123", // Replace with actual user ID
        content: content,
      });

      Alert.alert("Success", "Post created!");
      navigation.goBack();
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write your post..."
        multiline
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity style={styles.postButton} onPress={handleCreatePostFirebase}>
        <Text style={styles.buttonText}>Post (Firebase)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postButton} onPress={handleCreatePostAxios}>
        <Text style={styles.buttonText}>Post (Axios)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, height: 100 },
  postButton: { backgroundColor: "blue", padding: 10, marginTop: 10, borderRadius: 5 },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
});

export default CreatePostScreen;
