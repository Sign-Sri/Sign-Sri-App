import React, { useState } from "react";
import {
  View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Modal, ScrollView, Image
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { auth, db, storage } from "../../config/firebaseConfig"; // Import storage
import * as ImagePicker from "expo-image-picker"; // For video upload
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // For Firebase Storage
import Icon from "react-native-vector-icons/Feather"; // Use Feather icons

const predefinedFeelings = [
  "😊 Happy", "🎉 Celebrate", "😞 Disappointment",
  "❤️ Love", "😡 Angry", "😢 Sad", "🎂 Birthday", "Other +"
];

const CreatePostScreen = () => {
  const [content, setContent] = useState("");
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [customFeeling, setCustomFeeling] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoUri, setVideoUri] = useState(null); // State for video URI
  const navigation = useNavigation();

  // Function to pick a video from the device
  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Please allow access to your media library to upload videos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setVideoUri(result.uri); // Set the video URI
    }
  };

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
      // Fetch the user's first name from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const firstName = userDoc.data().firstName;

      let videoUrl = null;
      if (videoUri) {
        // Upload video to Firebase Storage
        const response = await fetch(videoUri);
        const blob = await response.blob();
        const storageRef = ref(storage, `videos/${new Date().toISOString()}`);
        await uploadBytes(storageRef, blob);
        videoUrl = await getDownloadURL(storageRef);
      }

      // Determine the feeling to save (selected or custom)
      const feelingToSave = selectedFeeling === "Other +" ? customFeeling : selectedFeeling;

      // Save the post to Firestore
      await addDoc(collection(db, "forumPosts"), {
        userId: user.uid,
        firstName: firstName,
        content: content,
        feeling: feelingToSave || null, // Save the feeling (or null if none)
        videoUrl: videoUrl || null, // Save the video URL (or null if none)
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

      {/* Video upload button */}
      <TouchableOpacity style={styles.videoButton} onPress={pickVideo}>
        <Icon name="video" size={20} color="#666" />
        <Text style={styles.videoButtonText}>Upload Video</Text>
      </TouchableOpacity>

      {/* Display selected video thumbnail */}
      {videoUri && (
        <Image source={{ uri: videoUri }} style={styles.videoThumbnail} />
      )}

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
  videoButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  videoButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#666",
  },
  videoThumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  dropdownContainer: { marginBottom: 20 },
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