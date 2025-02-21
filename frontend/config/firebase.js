// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAYjAtPOvBsePoYMiScvu5EtbUbn4S2jws",
    authDomain: "sign-sri-123.firebaseapp.com",
    projectId: "sign-sri-123",
    storageBucket: "sign-sri-123.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "1:955746453795:android:9028f5391defab4b3aa496",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);