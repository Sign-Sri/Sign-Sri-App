import React, { useState, useEffect, use } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../config/firebaseConfig';

const CommunityScreen = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading]  = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetchPosts();
    },[]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/community/posts`);
            setPosts(response.data);
            setError(null);
        }catch(err) {
            console.error('Error fetching posts:', err);
            setError('Failed to load posts. Please try again later.')
        }
        finally {
            setLoading(false);
        }
    }
}