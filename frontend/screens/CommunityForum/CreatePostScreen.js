import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

const predefinedFeelings = [
  "😊 Happy",
  "🎉 Celebrate",
  "😞 Disappointment",
  "❤️ Love",
  "😡 Angry",
  "😢 Sad",
  "🎂 Birthday",
  "Other +",
];

const CreatePostScreen = () => {
  const [content, setContent] = useState("");
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [customFeeling, setCustomFeeling] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

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
  
      const feelingToSave = selectedFeeling === "Other +" ? customFeeling : selectedFeeling;
  
      // Get user document from the "users" collection
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        Alert.alert("Error", "User data not found.");
        return;
      }
  
      const userData = userDoc.data();
      const firstName = userData.firstName || "Anonymous"; // Fallback if firstName doesn't exist
  
      await addDoc(collection(db, "forumPosts"), {
        userId: user.uid,
        firstName: firstName,
        content: content,
        feeling: feelingToSave || null,
        timestamp: serverTimestamp(),
        likes: 0, // Initialize likes
        likedBy: [], // Initialize likedBy array
        commentCount: 0, // Initialize comment count
      });
  
      Alert.alert("Success", "Post created!");
      navigation.goBack();
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post.");
    }
  };

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
        placeholderTextColor="#666"
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
              setIsModalVisible(true);
            } else {
              setSelectedFeeling(itemValue);
            }
          }}
          style={styles.dropdown}
          mode="dropdown"
          dropdownIconColor="#fff" // Set dropdown arrow color to white
        >
          <Picker.Item label="Select a feeling..." value="" style={styles.pickerItem} />
          {predefinedFeelings.map((feeling, index) => (
            <Picker.Item key={index} label={feeling} value={feeling} style={styles.pickerItem} />
          ))}
        </Picker>
      </View>

      {/* Display selected feeling */}
      {selectedFeeling && selectedFeeling !== "Other +" && (
        <View style={styles.selectedFeelingContainer}>
          <Text style={styles.selectedFeelingText}>
            Selected Feeling: {selectedFeeling}
          </Text>
        </View>
      )}

      {/* Post button */}
      <TouchableOpacity style={styles.postButton} onPress={handleCreatePost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>

      {/* Modal for custom feeling input */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter your feeling:</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Type your feeling..."
            placeholderTextColor="#666"
            value={customFeeling}
            onChangeText={setCustomFeeling}
            autoFocus={true}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCustomFeeling}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "##f5f5f5" },
  input: {
    borderWidth: 3,
    borderColor: "#182a38",
    padding: 10,
    borderRadius: 20,
    height: 100,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  dropdownContainer: {
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#182a38",
    borderRadius: 10,
    backgroundColor: "#182a38", // Background color of the dropdown container
    overflow: "hidden",
  },
  dropdown: {
    backgroundColor: "#182a38", // Background color of the dropdown
    color: "#fff", // Text color of the dropdown
  },
  pickerItem: {
    fontSize: 18, // Font size of the dropdown items
    color: "#000", // Text color of the dropdown items
  },
  selectedFeelingContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#182a38",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  selectedFeelingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  postButton: {
    backgroundColor: "#79DD09",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 20, // Add margin to separate the button and other elements
  },
  buttonText: {
    color: "white",
    fontSize: 18,
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
    borderRadius: 20,
    fontSize: 16,
    marginBottom: 20,
    borderColor: "#35d0fe",
    borderWidth: 3,
    color: "#000",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  modalButton: {
    backgroundColor: "#182a38",
    padding: 10,
    borderRadius: 20,
    width: "45%",
    alignItems: "center",
  },
});

export default CreatePostScreen;