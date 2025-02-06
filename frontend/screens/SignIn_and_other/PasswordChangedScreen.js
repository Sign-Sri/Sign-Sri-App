import React from "react";
import { View, Text, Image, StyleSheet,TouchableOpacity } from "react-native";

export default function PasswordChangedScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.checkCircle}>
                    <Image source={require("../../assets/Images/checkCircle.png")} style={styles.checkCircleImage} />
            <Text style={styles.title}>Password Changed</Text>
            <Image source={require("../../assets/Images/passwordChanged.jpg")} style={styles.illustration} />
            <Text style={styles.text}>Your password has been successfully changed.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignIn")}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}