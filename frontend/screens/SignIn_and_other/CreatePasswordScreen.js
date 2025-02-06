import React, { useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';

export default function CreatePasswordScreen({ navigation }) {
    const [newpassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create New Password</Text>

            <Image source={require('../../assets/Images/createPassword.jpg')} style={styles.illustration} />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
        </View>
    );
}