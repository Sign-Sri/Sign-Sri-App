import React, { useState } from "react";
import {
  View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Modal
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

const predefinedFeelings = [
  "😊 Happy", "🎉 Celebrate", "😞 Disappointment",
  "❤️ Love", "😡 Angry", "😢 Sad", "🎂 Birthday", "Other+"
];

const CreatePostScreen = () => {
  const [content, setContent] = useState("");
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [customFeeling, setCustomFeeling] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  // Function to handle post creation using Firebase
  const handleCreatePost = async () => {
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
        feeling: selectedFeeling || null, // Add the selected feeling (or null if none)
        timestamp: serverTimestamp(),
      });

      Alert.alert("Success", "Post created!");
      navigation.goBack();
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post.");
    }
  };

  // Function to handle custom feeling submission
  const handleCustomFeeling = () => {
    if (customFeeling.trim()) {
      setSelectedFeeling(customFeeling);
      setIsModalVisible(false);
    } else {
      Alert.alert("Error", "Please enter a custom feeling.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Post content input */}
      <TextInput
        style={styles.input}
        placeholder="Write your post..."
        multiline
        value={content}
        onChangeText={setContent}
      />

      {/* Feeling selection buttons */}
      <View style={styles.feelingsContainer}>
        {predefinedFeelings.map((feeling, index) => (
          <TouchableOpacity
            key={index}
            style={styles.feelingButton}
            onPress={() => {
              if (feeling === "Other+") {
                setIsModalVisible(true); // Open modal for custom feeling
              } else {
                setSelectedFeeling(feeling); // Set predefined feeling
              }
            }}
          >
            <Text style={styles.feelingText}>{feeling}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Display selected feeling */}
      {selectedFeeling && (
        <Text style={styles.selectedFeeling}>
          Selected Feeling: {selectedFeeling}
        </Text>
      )}

      {/* Post button */}
      <TouchableOpacity style={styles.postButton} onPress={handleCreatePost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>

      {/* Modal for custom feeling input */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Enter your custom feeling:</Text>
          <TextInput
            style={styles.input}
            placeholder="Feeling..."
            value={customFeeling}
            onChangeText={setCustomFeeling}
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleCustomFeeling}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, height: 100 },
  feelingsContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  feelingButton: { padding: 10, margin: 5, backgroundColor: "#ddd", borderRadius: 5 },
  feelingText: { fontSize: 16 },
  selectedFeeling: { marginTop: 10, fontSize: 16, color: "#555" },
  postButton: { backgroundColor: "blue", padding: 10, marginTop: 10, borderRadius: 5 },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalButton: { backgroundColor: "blue", padding: 10, margin: 5, borderRadius: 5 },
});

export default CreatePostScreen;