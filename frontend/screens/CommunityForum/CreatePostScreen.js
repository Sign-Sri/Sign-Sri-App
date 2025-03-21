import React, { useState } from "react";
import {
  View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Modal, ScrollView
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

const predefinedFeelings = [
  "😊 Happy", "🎉 Celebrate", "😞 Disappointment",
  "❤️ Love", "😡 Angry", "😢 Sad", "🎂 Birthday", "Other +"
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

      // Determine the feeling to save (selected or custom)
      const feelingToSave = selectedFeeling === "Other +" ? customFeeling : selectedFeeling;

      // Save the post to Firestore
      await addDoc(collection(db, "forumPosts"), {
        userId: user.uid,
        content: content,
        feeling: feelingToSave || null, // Save the feeling (or null if none)
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
    <ScrollView style={styles.container}>
      {/* Post content input */}
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        multiline
        value={content}
        onChangeText={setContent}
      />

      {/* Dropdown for feelings */}
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedFeeling}
          onValueChange={(itemValue) => {
            if (itemValue === "Other +") {
              setIsModalVisible(true); // Open modal for custom feeling
            } else {
              setSelectedFeeling(itemValue); // Set predefined feeling
            }
          }}
          style={styles.dropdown}
          mode="dropdown" // Android-specific prop
        >
          <Picker.Item label="Select a feeling..." value="" />
          {predefinedFeelings.map((feeling, index) => (
            <Picker.Item key={index} label={feeling} value={feeling} />
          ))}
        </Picker>
      </View>

      {/* Display selected feeling */}
      {selectedFeeling && selectedFeeling !== "Other +" && (
        <Text style={styles.selectedFeeling}>
          Selected Feeling: {selectedFeeling}
        </Text>
      )}

      {/* Post button */}
      <TouchableOpacity
        style={styles.postButton}
        onPress={handleCreatePost}
      >
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>

      {/* Modal for custom feeling input */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter your feeling:</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Type your feeling..."
            value={customFeeling}
            onChangeText={setCustomFeeling}
            autoFocus={true}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={handleCustomFeeling}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 20,
    fontSize: 16,
  },
  dropdownContainer: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5, color: "#333" },
  dropdown: { backgroundColor: "#f5f5f5", borderRadius: 10 },
  selectedFeeling: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    fontStyle: "italic",
  },
  postButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  modalInput: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  modalButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
});

export default CreatePostScreen;