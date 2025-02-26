// Path: frontend/screens/SignIn_and_other/SplashScreen.js

import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "../../Context/UserDetailContext";


const SplashScreen = () => {
  const navigation = useNavigation();
    const {userDetail,setUserDetail} = useContext(UserDetailContext);
  

  onAuthStateChanged(auth,async (user) => {
    if (user) {
      console.log(user);
      const result = await getDoc(doc(db, "users", user?.email));
      setUserDetail(result.data());
      navigation.navigate("Menu");

    }
  });

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("SignIn");
    }, 2000);
  }, []);

  
    
  
  return (
    <View style={styles.container}>
      {/* App Icon */}
      <View style={styles.iconContainer}>
        <Image
          source={require("../../assets/SignIn_and_other_Images/SplashLogoImage.png")} // Update this path if necessary
          style={styles.icon}
        />
       
      </View>

      {/* Loader */}
      <ActivityIndicator size="100" color="#000" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Background color
  },
 
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    width: 400,
    height: 350,
    resizeMode: "contain",
    alignItems: "center",
    marginBottom: 10,
  },

  loader: {
    marginTop: 10,
  },
});

export default SplashScreen;
