import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from "react-native";
import { getPosts, likePost } from "../../CommunityAPI/community";

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await likePost(postId);
      // Update the local state after liking a post
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, liked: true, likes: (post.likes || 0) + 1 } : post
        )
      );
    } catch (err) {
      setError('Failed to like the post');
      console.error(err);
    }
  };

  // Render loading state or error message
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()} // Ensure id is a string
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.username}>{item.username}</Text>
            <Text>{item.content}</Text>
            <Button
              title={item.liked ? `Liked (${item.likes || 0})` : `Like (${item.likes || 0})`}
              onPress={() => handleLike(item.id)}
              disabled={item.liked}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  username: {
    fontWeight: "bold",
  },
});

export default CommunityForum;