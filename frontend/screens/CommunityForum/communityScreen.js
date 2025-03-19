import React, { useState, useEffect, use } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth  } from '../../Context/AuthContext';
import { API_URL } from '../../config/firebaseConfig';
import { fetchAllPosts } from '../../services/communityService'

const CommunityScreen = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading]  = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    const { currentUser } = useAuth();

    useEffect(() => {
        fetchPosts();
    },[]);

    const loadPosts = async () => {
      try {
        setLoading(true);
        const postsData = await fetchAllPosts();
        setPosts(postsData);
        setError(null);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('Failed to load posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const handlePostPress = (post) => {
        navigation.navigate('PostDetail', { postId: post.id });
    };

    const handleNewPost = () => {
      if (!currentUser) {
        navigation.navigate('SignIn', { redirectTo: 'CreatePost' });
      }else{
        navigation.navigate('CreatePost');
      }
       
    };

    const renderPostItem = ({ item}) => (
        <TouchableOpacity
            style ={StyleSheet.postCard}
            onPress={() => handlePostPress(item)}
        >
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent} numberOfLines={2}>
                {item.content}
            </Text>
            <View style={styles.postFooter}>
        <Text style={styles.postAuthor}>By {item.userName}</Text>
        <View style={styles.postStats}>
          <Text style={styles.postLikes}>❤️ {item.likes}</Text>
          <Text style={styles.postComments}>💬 {item.comments?.length || 0}</Text>
        </View>
      </View>
      </TouchableOpacity>
    );

    if (loading) {
        return (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }

    if (error) {
        return (
          <View style={styles.centered}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchPosts}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        );
      }

      return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderPostItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                refreshing={loading}
                onRefresh={fetchPosts}
      />
      <TouchableOpacity style={styles.newPostButton} onPress={handleNewPost}>
        <Text style={styles.newPostButtonText}>+</Text>
      </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    listContainer: {
      padding: 10,
    },
    postCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      postContent: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
      },
      postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      postAuthor: {
        fontSize: 12,
        color: '#888',
      },
      postStats: {
        flexDirection: 'row',
      },
      postLikes: {
        fontSize: 12,
        marginRight: 10,
      },
      postComments: {
        fontSize: 12,
      },
      newPostButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
      },
      newPostButtonText: {
        fontSize: 30,
        color: '#FFFFFF',
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
    
    export default CommunityScreen;