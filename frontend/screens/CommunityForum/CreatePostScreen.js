import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const userData = await AsyncStorage.getItem('userInfo');
      if (userData) {
        setUserInfo(JSON.parse(userData));
      } else {
        alert('Please log in to create a post');
        navigation.navigate('SignIn');
      }
    } catch (err) {
      console.error('Error getting user info:', err);
    }
  };

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim() || !userInfo) {
      alert('Please fill in all fields');
      return;
    }

    try {
        setLoading(true);
        const response = await axios.post(`${API_URL}/api/community/posts`, {
          userId: userInfo.userId,
          userName: userInfo.displayName || userInfo.email,
          title: title.trim(),
          content: content.trim()
        });

        setLoading(false);
      navigation.navigate('PostDetail', { postId: response.data.id });
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post. Please try again.');
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter post title"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />

          <Text style={styles.label}>Content</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Write your post content here..."
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />

<TouchableOpacity 
            style={[
              styles.createButton, 
              (!title.trim() || !content.trim() || loading) && styles.createButtonDisabled
            ]} 
            onPress={handleCreatePost}
            disabled={!title.trim() || !content.trim() || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.createButtonText}>Create Post</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    scrollContainer: {
      flex: 1,
    },
    formContainer: {
      padding: 15,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333',
    },
    titleInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
      },
      contentInput: {
        height: 200,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
      },
      createButton: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        paddingVertical: 12,
        alignItems: 'center',
      },
      createButtonDisabled: {
        backgroundColor: '#BBDEFB',
      },
      createButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
      },
    });
    
    export default CreatePostScreen;