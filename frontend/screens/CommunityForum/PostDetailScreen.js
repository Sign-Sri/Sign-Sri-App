import React, { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    ScrollView, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform
  } from 'react-native';
  import axios, { formToJSON } from 'axios';
import { useRoute } from '@react-navigation/native';
import { API_URL } from '../../config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostDetailScreen = () => {
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [commenting, setCommenting] = useState(false);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const route = useRoute();
    const { postId } = route.params;
  
    useEffect(() => {
        fetchPost();
        getUserInfo();
      }, []);

      const getUserInfo = async () => {
        try {
          const userData = await AsyncStorage.getItem('userInfo');
          if (userData) {
            setUserInfo(JSON.parse(userData));
          }
        } catch (err) {
          console.error('Error getting user info:', err);
        }
      };

      const fetchPost = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${API_URL}/api/community/posts/${postId}`);
          setPost(response.data);
          setError(null);
        } catch (err) {
          console.error('Error fetching post:', err);
          setError('Failed to load post. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      const handleAddComment = async () => {
        if (!comment.trim() || !userInfo) return;
    
        try {
          setCommenting(true);
          await axios.post(`${API_URL}/api/community/posts/${postId}/comments`, {
            userId: userInfo.userId,
            userName: userInfo.displayName || userInfo.email,
            content: comment
          });
      
          
          setComment('');
      fetchPost(); // Refresh post to show new comment
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Failed to add comment. Please try again.');
    } finally {
      setCommenting(false);
    }
  };

  const handleLikePost = async () => {
    if (!userInfo) return;

    try {
      await axios.post(`${API_URL}/api/community/posts/${postId}/like`, {
        userId: userInfo.userId
      });
      fetchPost(); // Refresh post to update likes
    } catch (err) {
      console.error('Error liking post:', err);
      if (err.response?.status === 400) {
        alert('You already liked this post');
      } else {
        alert('Failed to like post. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Post not found'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchPost}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postAuthor}>Posted by {post.userName}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
          
          <View style={styles.postStats}>
            <TouchableOpacity 
              style={styles.likeButton} 
              onPress={handleLikePost}
            >
            <Text style={styles.likeButtonText}>❤️ {post.likes}</Text>
            </TouchableOpacity>
            <Text style={styles.commentCount}>
              💬 {post.comments?.length || 0} Comments
            </Text>
          </View>
        </View>


        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>Comments</Text>
          
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <View key={index} style={styles.commentItem}>
                <Text style={styles.commentAuthor}>{comment.userName}</Text>
                <Text style={styles.commentContent}>{comment.content}</Text>
              </View>

            ))
            ) : (
  <Text style={styles.noComments}>No comments yet. Be the first to comment!</Text>
    )}
    </View>
</ScrollView>

<View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
          multiline
        />

<TouchableOpacity 
          style={[
            styles.commentButton, 
            (!comment.trim() || commenting) && styles.commentButtonDisabled
          ]} 
          onPress={handleAddComment}
          disabled={!comment.trim() || commenting}
        >
          {commenting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.commentButtonText}>Post</Text>
          )}
        </TouchableOpacity>
      </View>
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
    postContainer: {
      backgroundColor: '#FFFFFF',
      padding: 15,
      marginBottom: 10,
    },
    postTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    postAuthor: {
      fontSize: 14,
      color: '#888',
      marginBottom: 15,
    },
    postContent: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
      },
      postStats: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
      },
      likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      likeButtonText: {
        fontSize: 14,
      },
      commentCount: {
        fontSize: 14,
        color: '#555',
      },
      commentsContainer: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginBottom: 80,
      },
      commentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      commentItem: {
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
      },
      commentAuthor: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      commentContent: {
        fontSize: 14,
        lineHeight: 20,
      },
      noComments: {
        fontSize: 14,
        color: '#888',
        fontStyle: 'italic',
      },
      commentInputContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#F9F9F9',
  },
  commentButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentButtonDisabled: {
    backgroundColor: '#BBDEFB',
  },
  commentButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default PostDetailScreen;