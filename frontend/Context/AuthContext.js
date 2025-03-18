import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../../frontend/config/firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const signup = async (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const login = async (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logout = () => {
      return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            // User is signed in
            setCurrentUser(user);
            
            // Get and store the ID token
            const token = await user.getIdToken();
            await AsyncStorage.setItem('authToken', token);
            
            // Store basic user info
            await AsyncStorage.setItem('userInfo', JSON.stringify({
              userId: user.uid,
              email: user.email,
              displayName: user.displayName || user.email.split('@')[0],
              photoURL: user.photoURL
            }));
        } else {
            // User is signed out
            setCurrentUser(null);
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('userInfo');
          }
          setLoading(false);
        });
    
        return unsubscribe;
      }, []);
    
      const value = {
        currentUser,
        login,
        signup,
        logout,
        loading
      };

      return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      );
    };