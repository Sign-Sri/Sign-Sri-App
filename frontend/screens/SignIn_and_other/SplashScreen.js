// Path: frontend/screens/SignIn_and_other/SplashScreen.js

import React from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";


const SplashScreen = () => {
  const navigation = useNavigation();

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
          source={require("../../assets/Images/SplashLogoImage.png")} // Update this path if necessary
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
