import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ToastAndroid, ActivityIndicator } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../Context/UserDetailContext';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useRoute } from '@react-navigation/native';

export default function SignInScreen({ navigation }) {
  const router = useRoute();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userDetail,setUserDetail} = useContext(UserDetailContext);
  const[loading,setLoading]=useState(false);

  const onSignInClick=()=>{
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then(async(resp)=>{
      const user=resp.user;
      console.log(user);
      await getUserDetail();
      setLoading(false);
      router.replace('../Home');

    }).catch(e=>{
      console.log(e.message);
      setLoading(false);
      ToastAndroid.show("Incorrect email & Password",ToastAndroid.BOTTOM)
    })
  }


  const getUserDetail = async () => {
    const result = await getDoc(doc(db,'users',email));
    console.log(result.data());
    setUserDetail(result.data());
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Sign In</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          onChangeText={(value) => setEmail(value)}	
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}	
          secureTextEntry
        />
        
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={onSignInClick}
        disabled={loading}
      >
          {!loading? <Text style={styles.buttonText}>Sign In</Text>:
          <ActivityIndicator size={"large"} color={Colors.WHITE}/>}
      </TouchableOpacity>

      <Text style={styles.orText}>Or</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/SignIn_and_other_Images/google_icon.jpg')} style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        
        
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginTop: 50,
  },

backButton: { 
  alignSelf: 'flex-start',
  marginBottom: 20,
},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3D59',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    height: 56,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#1E3D59',
    fontSize: 14,
  },
  signInButton: {
    height: 56,
    backgroundColor: '#1E3D59',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
   
  },
  orText: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: 24,
  },
  socialButtons: {
    gap: 16,
  },
  socialButton: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#1E3D59',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 24,
  },
  footerText: {
    color: '#666666',
    fontSize: 14,
  },
  signUpText: {
    color: '#1E3D59',
    fontSize: 14,
    fontWeight: 'bold',
  },
});