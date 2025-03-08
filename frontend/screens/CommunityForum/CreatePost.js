import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const CreatePost = ({ navigation }) => {
  const [content, setContent] = useState('');
  const [feelings, setFeelings] = useState('happy');
  const [customFeeling, setCustomFeeling] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  // Handle image selection
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  // Handle video selection
  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setVideos([...videos, result.assets[0].uri]);
    }
  };

  // Handle post creation
  const handleCreatePost = async () => {
    const feelingToSend = feelings === 'other' ? customFeeling : feelings;

    const formData = new FormData();
    formData.append('content', content);
    formData.append('feelings', feelingToSend);

    // Append images
    images.forEach((image, index) => {
      formData.append('images', {
        uri: image,
        name: `image${index}.jpg`,
        type: 'image/jpeg',
      });
    });

    // Append videos
    videos.forEach((video, index) => {
      formData.append('videos', {
        uri: video,
        name: `video${index}.mp4`,
        type: 'video/mp4',
      });
    });

    try {
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Post created successfully');
      navigation.goBack(); // Navigate back after creating the post
    } catch (error) {
      Alert.alert('Error creating post', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
        style={styles.input}
        multiline
      />

      {/* Picker for feelings */}
      <View style={styles.pickerContainer}>
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
      </View>

      {/* Show custom feeling input only if "other" is selected */}
      {feelings === 'other' && (
        <TextInput
          placeholder="Enter your feeling"
          value={customFeeling}
          onChangeText={setCustomFeeling}
          style={styles.input}
        />
      )}

      {/* Buttons for picking images and videos */}
      <View style={styles.mediaButtons}>
        <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
          <Text style={styles.mediaButtonText}>Pick Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediaButton} onPress={pickVideo}>
          <Text style={styles.mediaButtonText}>Pick Video</Text>
        </TouchableOpacity>
      </View>

      {/* Display selected images */}
      {images.map((image, index) => (
        <Image key={index} source={{ uri: image }} style={styles.media} />
      ))}

      {/* Display selected videos */}
      {videos.map((video, index) => (
        <View key={index} style={styles.videoContainer}>
          <Text style={styles.videoText}>Video {index + 1}</Text>
        </View>
      ))}

      {/* Button to create the post */}
      <Button title="Create Post" onPress={handleCreatePost} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 60,
    width: '100%',
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  mediaButton: {
    backgroundColor: '#172937',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  mediaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  media: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  videoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  videoText: {
    fontWeight: 'bold',
  },
});

export default CreatePost;