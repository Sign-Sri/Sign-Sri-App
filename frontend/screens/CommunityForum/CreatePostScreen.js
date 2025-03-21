import React, { useState, useEffect, use } from "react";
import {
  View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Modal, ScrollView, Image
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../config/firebaseConfig";
import * as ImagePicker from "expo-image-picker";

const predefinedFeelings = [
  "😊 Happy", "🎉 Celebrate", "😞 Disappointment",
  "❤️ Love", "😡 Angry", "😢 Sad", "🎂 Birthday", "Other +"
];

const CreatePostScreen = () => {
  const [content, setContent] = useState("");
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [customFeeling, setCustomFeeling] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [images, setImages] = useState([]); // State to store selected images
  const [uploading, setUploading] = useState(false); // State to track image upload progress
  const navigation = useNavigation();

  // Request media library permissions on component mount
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Please allow access to your photos to upload images.");
      }
    })();
  }, []);

  // Function to handle image selection
  const pickImage = async () => {
    console.log("Add Image Button Pressed");
    try{
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType.Images, // Use MediaType instead of MediaTypeOptions
        allowsMultipleSelection: true, // Allow multiple selections
        quality: 0.5, // Reduce image quality for faster uploads
      });

      console.log("Image picker result:", result);

      if (!result.canceled) {
        setImages([...images, ...result.assets]); // Add selected images to the state
        console.log("Selected Images.", result.assets);
      }
    } catch (error) {
      console.error("Error picking images:", error);
      Alert.alert("Error", "Failed to pick images.");
    }
  };

  //Debugging: Log images state when it changes
  useEffect(() => {
    console.log("Images state updated: ", images);
  }, [images]);

  // Function to upload images to Firebase Storage
  const uploadImages = async () => {
    const imageUrls = [];
    for (const image of images) {
      try {
        // Fetch the image file
        const response = await fetch(image.uri);
        const blob = await response.blob();

        // Generate a unique filename using a timestamp
        const filename = `forumPosts/${Date.now()}_${image.uri.split("/").pop()}`;

        // Create a reference to the Firebase Storage path
        const storageRef = ref(storage, filename);

        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, blob);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
        imageUrls.push(downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
        Alert.alert("Error", "Failed to upload images.");
        return null;
      }
    }
    return imageUrls;
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

      setUploading(true); // Start uploading images

      // Upload images and get their URLs
      const imageUrls = images.length > 0 ? await uploadImages() : [];

      // Determine the feeling to save (selected or custom)
      const feelingToSave = selectedFeeling === "Other +" ? customFeeling : selectedFeeling;

      // Save the post to Firestore
      await addDoc(collection(db, "forumPosts"), {
        userId: user.uid,
        content: content,
        feeling: feelingToSave || null, // Save the feeling (or null if none)
        images: imageUrls, // Save image URLs
        timestamp: serverTimestamp(),
      });

      setUploading(false); // Stop uploading images
      Alert.alert("Success", "Post created!");
      navigation.goBack();
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post.");
      setUploading(false); // Stop uploading images
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

      {/* Image upload section */}
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Add Image </Text>
      </TouchableOpacity>

      {/* Display selected images */}
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={styles.image} />
        ))}
      </View>

      {/* Post button */}
      <TouchableOpacity
        style={styles.postButton}
        onPress={handleCreatePost}
        disabled={uploading} // Disable button while uploading
      >
        <Text style={styles.buttonText}>
          {uploading ? "Uploading..." : "Post"}
        </Text>
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
  imageButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
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