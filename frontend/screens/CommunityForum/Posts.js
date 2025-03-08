// frontend/screens/Posts.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Posts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [feelingFilter, setFeelingFilter] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts?sortBy=${sortBy}&feeling=${feelingFilter}`);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [sortBy, feelingFilter]);

  const getFeelingEmoji = (feeling) => {
    switch (feeling) {
      case 'happy':
        return '😊';
      case 'sad':
        return '😢';
      case 'emotional':
        return '😭';
      case 'celebrate':
        return '🎉';
      case 'angry':
        return '😡';
      case 'excited':
        return '🤩';
      case 'grateful':
        return '🙏';
      default:
        return '🤔'; // Default emoji for "other" or custom feelings
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Picker
          selectedValue={sortBy}
          style={styles.picker}
          onValueChange={(itemValue) => setSortBy(itemValue)}
        >
          <Picker.Item label="Sort by Date" value="date" />
          <Picker.Item label="Sort by Likes" value="likes" />
          <Picker.Item label="Sort by Comments" value="comments" />
        </Picker>
        <Picker
          selectedValue={feelingFilter}
          style={styles.picker}
          onValueChange={(itemValue) => setFeelingFilter(itemValue)}
        >
          <Picker.Item label="All Feelings" value="" />
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

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.feeling}>
              {getFeelingEmoji(item.feelings)} {item.feelings}
            </Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
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
  picker: {
    height: 50,
    width: 150,
    marginLeft: 16,
  },
  post: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  feeling: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Posts;