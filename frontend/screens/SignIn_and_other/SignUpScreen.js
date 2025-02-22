import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../../config/firebaseConfig";

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Prevent multiple requests

  const handleSignUp = async () => {
    try {
      // Validate passwords match
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }
  
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      // Update user profile
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });
  
      // Send verification email
      await userCredential.user.sendEmailVerification();
  
      // Call backend to store additional user data
      await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
        }),
      });
  
      // Navigate to email verification screen
      navigation.navigate('VerifyEmail', { email });
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

      <Text style={styles.termsText}>By proceeding you agree to our Terms & Privacy Policy</Text>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Signing Up..." : "Sign Up"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#FFFFFF', marginTop: 32 },
  backButton: { alignSelf: 'flex-start', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1E3D59', marginBottom: 32 },
  input: { height: 56, backgroundColor: '#F5F5F5', borderRadius: 12, paddingHorizontal: 16, marginBottom: 16, fontSize: 16 },
  termsText: { fontSize: 14, color: '#666666', textAlign: 'center', marginVertical: 24 },
  signUpButton: { height: 56, backgroundColor: '#1E3D59', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
