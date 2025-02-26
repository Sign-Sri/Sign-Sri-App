import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from "../config/firebaseConfig";
import { signOut } from 'firebase/auth';


const MenuScreen = ({ navigation }) => {
    const handleLogout = async () => {
        try {
          await signOut(auth);
          navigation.replace("SignIn"); // Redirect to SignIn screen after logout
        } catch (error) {
          console.error("Logout Error:", error);
        }
      };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SignSri - Menu</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('SignToText')}>
                <Text style={styles.buttonText}>Sign to Text</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('TextToSign')}>
                <Text style={styles.buttonText}>Text to Sign</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Dictionary')}>
                <Text style={styles.buttonText}>Sign Language Dictionary</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('School')}>
                <Text style={styles.buttonText}>Sign Language School</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Phrasebook')}>
                <Text style={styles.buttonText}>Sign Language Phrasebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CommunityForum')}>
                <Text style={styles.buttonText}>Community Forum</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        marginVertical: 10,
        width: '80%',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: "#d9534f", // Red button for sign out
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
});

export default MenuScreen;
