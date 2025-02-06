import React, { useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function CreatePasswordScreen({ navigation }) {
    const [newPassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Create New Password</Text>

        <Image source={require("../../assets/Images/createPassword.jpg")} style={styles.illustration} />
        
        <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
        />
        
        <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
        />
        
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate("PasswordChanged")}>
            <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#FFFFFF",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1E3D59",
        marginBottom: 32,
    },
    illustration: {
        width: '100%' ,
        height: 200,
        resizeMode: "contain",
        marginBottom: 32,
    },
    input: {
        height: 56,
        paddingHorizontal: 16,
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    saveButton: {
        height: 56,
        padding: 15,
        backgroundColor: "#1E3D59",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        marginTop: 16
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});