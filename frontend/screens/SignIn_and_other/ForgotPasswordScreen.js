import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#000000" />
            </TouchableOpacity>
      <Text style={styles.title}>Forgot Password</Text>
      
      <Image 
        source={require('../../assets/SignIn_and_other_Images/forgot.jpg')}
        style={styles.illustration}
      />
      
      <Text style={styles.description}>
        Please Enter Your Email Address To Receive a Verification Code
      </Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('VerifyEmail')}
        >
          <Image source={require('../../assets/SignIn_and_other_Images/google_icon.jpg')} style={styles.optionIcon} />
          <Text style={styles.optionText}>Continue With Email</Text>
        </TouchableOpacity>

        
          <Image source={require('../../assets/SignIn_and_other_Images/phone.jpg')} style={styles.optionIcon} />
          <Text style={styles.optionText}>Continue With Phone</Text>
        
      </View>
    </View>
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
    illustration: {
      width: '100%',
      height: 200,
      resizeMode: 'contain',
      marginBottom: 32,
    },
    description: {
      fontSize: 16,
      color: '#666666',
      textAlign: 'center',
      marginBottom: 32,
    },
    optionsContainer: {
      gap: 16,
    },
    option: {
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      paddingHorizontal: 16,
    },
    optionIcon: {
      width: 24,
      height: 24,
      marginRight: 12,
    },
    optionText: {
      fontSize: 16,
      color: '#1E3D59',
    },
  });