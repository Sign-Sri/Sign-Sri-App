import React, { useState, useEffect } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const user = auth.currentUser;
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setEmail(data.email || "");
          setPhoneNumber(data.phoneNumber || "");
          setProfilePicture(data.profilePicture || "");
        }
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleImagePick = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        setUpdating(true);
        const imageUri = result.assets[0].uri;
  
        // Convert image URI to Blob
        const response = await fetch(imageUri);
        const blob = await response.blob();
  
        // Upload to Firebase Storage
        const storageRef = ref(storage, `profilePictures/${user.uid}.jpg`);
        await uploadBytes(storageRef, blob);
  
        // Get Image URL
        const downloadURL = await getDownloadURL(storageRef);
        setProfilePicture(downloadURL);
  
        // Save URL in Firestore
        await setDoc(doc(db, "users", user.uid), { profilePicture: downloadURL }, { merge: true });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUpdating(false);
    }
  };
  

  const handleUpdateProfile = async () => {
    setUpdating(true);
    await setDoc(
      doc(db, "users", user.uid),
      { firstName, lastName },
      { merge: true }
    );
    setUpdating(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("SignIn");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
        <Image
          source={profilePicture ? { uri: profilePicture } : require("../../assets/default-profile.png")}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.email}>{email}</Text>

      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
        placeholderTextColor="#888"
      />
      <TextInput
        style={[styles.input, styles.readOnlyInput]}
        value={phoneNumber}
        editable={false}
        placeholder="Phone Number"
      />

      <TouchableOpacity
        onPress={handleUpdateProfile}
        style={[styles.button, updating && styles.buttonDisabled]}
        disabled={updating}
      >
        <Text style={styles.buttonText}>{updating ? "Updating..." : "Save Profile"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: moderateScale(20),
    backgroundColor: "#F5F5F5",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  imageContainer: {
    marginBottom: verticalScale(10),
  },
  profileImage: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    borderWidth: scale(2),
    borderColor: "#182a38",
  },
  email: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#333",
    marginBottom: verticalScale(10),
  },
  input: {
    width: "90%",
    padding: moderateScale(12),
    borderRadius: moderateScale(50),
    backgroundColor: "#FFF",
    borderWidth: scale(1),
    borderColor: "#DDD",
    marginBottom: verticalScale(10),
    fontSize: scale(16),
  },
  readOnlyInput: {
    backgroundColor: "#EAEAEA",
    color: "#777",
  },
  button: {
    backgroundColor: "#182a38",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(25),
    alignItems: "center",
    width: "90%",
    marginBottom: verticalScale(10),
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: scale(16),
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(25),
    alignItems: "center",
    width: "90%",
  },
});

export default ProfileScreen;
