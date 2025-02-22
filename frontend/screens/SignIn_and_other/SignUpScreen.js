import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import {auth,db} from '../../config/firebaseConfig';
import {setDoc,doc} from 'firebase/firestore';

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const CreateNewAccount = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then(async(resp)=>{
        const user = resp.user;
        console.log(user);
        await SaveUser(user);
        //save user to database
        
      })
      .catch(e => {
        console.log(e.message);
      })
  }

  const SaveUser = async(user)=>{
    await setDoc(doc(db,'users',email),{
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      member:false,
      uid:user?.uid
    })
    // navigate to next screen
  }

  const handleSignUp = async () => {
    // Validate inputs
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
      return;
    }
  }
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#000000" />
            </TouchableOpacity>
      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(value) => setFirstName(value)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(value) => setLastName(value)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(value) => setPhoneNumber(value)}
        keyboardType="phone-pad"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
        secureTextEntry
      />

      <Text style={styles.termsText}>
        By proceeding you agree to our Terms & Privacy Policy
      </Text>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={CreateNewAccount}
        //onPress={() => navigation.navigate('VerifyEmail')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginTop: 32,
  },
  backButton: { 
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3D59',
    marginBottom: 32,
  },
  input: {
    height: 56,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  termsText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginVertical: 24,
  },
  signUpButton: {
    height: 56,
    backgroundColor: '#1E3D59',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});