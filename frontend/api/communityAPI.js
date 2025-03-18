import axios from "axios";
import AsyncStorage  from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.126.131r:5000"; // Change this if using a real server

// Create an axios instance with configuration
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Get all posts
export const getPosts = async (retryCount =0) => {
    try{
        const catchedPosts = await AsyncStorage.getItem('cached_posts');
        try {
            const response = await axios.get('/posts');
            if (response.data) {
                await AsyncStorage.setItem('cached_posts',JSON.stringify(response.data));
            }
            return response.data;
          }
          catch (error) {
            console.error("Error fetching posts:", error);
            if (cachedPosts) {
                console.log("Returning cached posts due to network error");
                return JSON.parse(cachePosts);
            }
            if (retryCount < 3) {
                console.log('Retrying getPosts ( ${retryCount +1}/3)...');
                await new Promise(resolve => setTimeout(resolve, 1000));
                return getPosts(retryCount + 1);
            }
            throw error;
          }
    }
    catch (error) {
        console.error("Error in getPosts with cache handling:", error);
        throw error;
      }
   
};


// Create a new post
export const createPost = async (userId, content, retryCount = 0) => {
  try {
    const newPost = {
        uid: userId, // uid from Firebase
        content,
        timestamp:new Date().toISOString()
    };

    // Save to local storage for offline posting
    try {
      const pendingPosts = await AsyncStorage.getItem('pending_posts');
      const pendingArray = pendingPosts ? JSON.parse(pendingPosts) : [];
      pendingArray.push(newPost);
      await AsyncStorage.setItem('pending_posts', JSON.stringify(pendingArray));
    } 
    catch (storageError) {
      console.error("Error saving to pending posts:", storageError);
    }

    try {
        const response = await api.post('/posts', newPost);
        return response.data;
      } catch (error) {
        console.error("Error creating post:", error);

        // Implement retry logic (max 3 retries)
      if (retryCount < 3) {
        console.log(`Retrying createPost (${retryCount + 1}/3)...`);
        // Wait for 1 second before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
        return createPost(userId, content, retryCount + 1);
      }

      // If all retries fail, we'll still have the post saved in pendingPosts
      throw error;
    }
  } catch (error) {
    console.error("Error in createPost:", error);
    throw error;
  }
};

// Add a function to sync pending posts when online
export const syncPendingPosts = async () => {
    try {
      const pendingPosts = await AsyncStorage.getItem('pending_posts');
      if (!pendingPosts) return;
      
      const pendingArray = JSON.parse(pendingPosts);
      if (pendingArray.length === 0) return;
      
      // Try to post each pending post
      const successfulIds = [];
      
      for (let i = 0; i < pendingArray.length; i++) {
        try {
          await api.post('/posts', pendingArray[i]);
          successfulIds.push(i);
        } catch (error) {
          console.error(`Failed to sync post at index ${i}:`, error);
        }
      }

      // Remove successful posts from pending
    if (successfulIds.length > 0) {
        const remainingPosts = pendingArray.filter((_, index) => 
          !successfulIds.includes(index)
        );
        await AsyncStorage.setItem('pending_posts', JSON.stringify(remainingPosts));
      }
    } catch (error) {
      console.error("Error syncing pending posts:", error);
    }
  };