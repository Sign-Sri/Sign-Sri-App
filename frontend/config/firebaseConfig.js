// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth,getReactNativePersistence} from 'firebase/auth';
import {ReactNativeAsyncStorage} from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBASuMGclC4I1QwbA1YdjshRopD7Ih2fKs",
  authDomain: "sign-sri-123.firebaseapp.com",
  projectId: "sign-sri-123",
  storageBucket: "sign-sri-123.firebasestorage.app",
  messagingSenderId: "955746453795",
  appId: "1:955746453795:web:e07d124448e599bb3aa496",
  measurementId: "G-FB63CVRYPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    
});
const analytics = getAnalytics(app);
