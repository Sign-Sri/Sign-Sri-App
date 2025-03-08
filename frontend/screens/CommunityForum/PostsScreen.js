// PostsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { Video } from 'expo-av';

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState(''); // State for comment input

  // Fetch posts from the backend
  useEffect(() => {
    
    fetchPosts();
  }, []);

  
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };


  // Handle liking a post
  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/like`);
      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to like the post');
    }
  };

  // Handle commenting on a post
  const handleComment = async (postId) => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Comment cannot be empty');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/comment`, {
        content: comment,
      });
      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
      setComment(''); // Clear the comment input
    } catch (error) {
      Alert.alert('Error', 'Failed to add comment');
    }
  };

  // Handle sharing a post
  const handleShare = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/share`);
      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to share the post');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.feeling}>{item.feelings}</Text>
            <Text>{item.content}</Text>

            {/* Display images */}
            {item.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={{ width: 200, height: 200 }} />
            ))}

            {/* Display videos */}  
            {item.videos.map((video, index) => (
              <Video
                key={index}
                source={{ uri: video }}
                style={styles.media}
                useNativeControls
                resizeMode="contain"
              />
            ))}

            {/* Like, Comment, and Share Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleLike(item._id)}>
                <Text>👍 {item.likes.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShare(item._id)}>
                <Text>🔗 {item.shares.length}</Text>
              </TouchableOpacity>
            </View>

            {/* Comments Section */}
            <View style={styles.comments}>
              <Text style={styles.commentsTitle}>Comments:</Text>
              {item.comments.map((comment, index) => (
                <View key={index} style={styles.comment}>
                  <Text>{comment.content}</Text>
                </View>
              ))}
              <TextInput
                placeholder="Add a comment..."
                value={comment}
                onChangeText={setComment}
                style={styles.commentInput}
              />
              <Button title="Comment" onPress={() => handleComment(item._id)} />
            </View>
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
  post: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
  },
  feeling: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  media:{
    width: '100%',
    height: 200,
    marginBottom:16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  comments: {
    marginTop: 8,
  },
  commentsTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  comment: {
    marginBottom: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
});

export default PostsScreen;