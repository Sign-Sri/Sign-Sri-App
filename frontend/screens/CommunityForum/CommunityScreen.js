import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Alert,
  ActivityIndicator 
} from "react-native";
import axios from "axios";

// Update these constants with your actual API endpoints
const API_BASE_URL = "http://192.168.126.131r:5000"; // Replace with your actual API URL
const API_TIMEOUT = 10000; // 10 seconds timeout

// Create an Axios instance with better configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add axios interceptors for better error handling
api.interceptors.request.use(
  config => {
    // You can add authentication tokens here if needed
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Transform network errors to be more user-friendly
    if (error.message === "Network Error") {
      error.userMessage = "Network connection failed. Please check your internet connection.";
    } else if (error.code === "ECONNABORTED") {
      error.userMessage = "The request took too long to complete. Please try again.";
    } else {
      error.userMessage = "Something went wrong. Please try again later.";
    }
    return Promise.reject(error);
  }
);

// API functions
const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Error in getPosts:", error);
    throw error;
  }
};

const createPost = async (userId, content) => {
  try {
    const response = await api.post("/posts", { userId, content });
    return response.data;
  } catch (error) {
    console.error("Error in createPost:", error);
    throw error;
  }
};

const CommunityScreen = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts();
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts", error);
      setError(error.userMessage || "Failed to load posts. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!content.trim()) {
      Alert.alert("Empty Post", "Please write something before posting.");
      return;
    }

    setLoading(true);
    try {
      const userId = "user123"; // Replace with actual user ID
      await createPost(userId, content);
      setContent("");
      fetchPosts(); // Refresh posts after creating
    } catch (error) {
      console.error("Error creating post", error);
      Alert.alert(
        "Error",
        error.userMessage || "Failed to create post. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Community Forum</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write a post..."
          value={content}
          onChangeText={setContent}
          style={styles.input}
          multiline
        />
      </View>
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton]} 
        onPress={handleCreatePost}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "POSTING..." : "POST"}
        </Text>
      </TouchableOpacity>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Failed to load posts. Please check your connection and try again.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchPosts}>
            <Text style={styles.retryText}>RETRY</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {loading && !error ? (
        <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postItem}>
              <Text style={styles.postContent}>{item.content}</Text>
            </View>
          )}
          ListEmptyComponent={
            !error && (
              <Text style={styles.emptyText}>
                No posts yet. Be the first to post!
              </Text>
            )
          }
          refreshing={loading}
          onRefresh={fetchPosts}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  input: {
    padding: 12,
    minHeight: 80,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#90CAF9',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  postItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postContent: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 24,
  }
});

export default CommunityScreen;