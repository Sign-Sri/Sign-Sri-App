import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";


const ProfileScreen = () => {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const user = auth.currentUser;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigation = useNavigation();

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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUpdating(true);
      const imageUri = result.assets[0].uri;
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setProfilePicture(downloadURL);

      await setDoc(doc(db, "users", user.uid), { profilePicture: downloadURL }, { merge: true });
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
      navigation.replace("SignIn");  // ✅ Navigate to SignIn screen after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", padding: moderateScale(20) }}>
      <TouchableOpacity onPress={handleImagePick}>
        <Image
          source={profilePicture ? { uri: profilePicture } : require("../../assets/default-profile.png")}
          style={{
            width: scale(120),
            height: scale(120),
            borderRadius: scale(60),
            marginBottom: verticalScale(10),
          }}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: moderateScale(16), fontWeight: "bold" }}>{email}</Text>
      <TextInput
        style={{
          width: "100%",
          padding: moderateScale(10),
          borderBottomWidth: 1,
          marginBottom: verticalScale(10),
        }}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={{
          width: "100%",
          padding: moderateScale(10),
          borderBottomWidth: 1,
          marginBottom: verticalScale(10),
        }}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <TextInput
        style={{
          width: "100%",
          padding: moderateScale(10),
          borderBottomWidth: 1,
          marginBottom: verticalScale(10),
        }}
        value={phoneNumber}
        editable={false} // Make phone number read-only
      />
      <TouchableOpacity
        onPress={handleUpdateProfile}
        style={{
          backgroundColor: updating ? "gray" : "blue",
          padding: moderateScale(10),
          borderRadius: moderateScale(50),
          marginBottom: verticalScale(10),
        }}
        disabled={updating}
      >
        <Text style={{ color: "white", fontSize: moderateScale(14) }}>
          {updating ? "Updating..." : "Save Profile"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "red",
          padding: moderateScale(10),
          borderRadius: moderateScale(50),
        }}
      >
        <Text style={{ color: "white", fontSize: moderateScale(14) }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
