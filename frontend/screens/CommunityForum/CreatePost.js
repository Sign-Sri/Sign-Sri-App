// frontend/screens/CreatePost.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Picker, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const CreatePost = ({ navigation }) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [feelings, setFeelings] = useState('happy');
  const [customFeeling, setCustomFeeling] = useState(''); // State for custom feeling input

  const handleCreatePost = async () => {
    try {
      const feelingToSend = feelings === 'other' ? customFeeling : feelings; // Use custom feeling if "other" is selected
      const response = await axios.post('http://localhost:5000/api/posts', {
        content,
        images,
        feelings: feelingToSend,
      });
      Alert.alert('Post created successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error creating post', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
        style={styles.input}
        multiline
      />
      <Picker
        selectedValue={feelings}
        style={styles.picker}
        onValueChange={(itemValue) => setFeelings(itemValue)}
      >
        <Picker.Item label="Happy 😊" value="happy" />
        <Picker.Item label="Sad 😢" value="sad" />
        <Picker.Item label="Emotional 😭" value="emotional" />
        <Picker.Item label="Celebrate 🎉" value="celebrate" />
        <Picker.Item label="Angry 😡" value="angry" />
        <Picker.Item label="Excited 🤩" value="excited" />
        <Picker.Item label="Grateful 🙏" value="grateful" />
        <Picker.Item label="Other +" value="other" />
      </Picker>

      {/* Show custom feeling input only if "other" is selected */}
      {feelings === 'other' && (
        <TextInput
          placeholder="Enter your feeling"
          value={customFeeling}
          onChangeText={setCustomFeeling}
          style={styles.input}
        />
      )}

      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
});

export default CreatePost; // Ensure this matches the component name