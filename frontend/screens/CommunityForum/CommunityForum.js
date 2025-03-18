import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, ActivityIndicator } from "react-native";
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
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await likePost(postId);
      // Optionally, you can update the local state after liking a post
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, liked: true } : post
        )
      );
    } catch (err) {
      setError('Failed to like the post');
    }
  };

  // Render loading state or error message
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Community Forum</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()} // Ensure id is a string
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              marginBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.username}</Text>
            <Text>{item.content}</Text>
            <Button
              title={item.liked ? "Liked" : "Like"}
              onPress={() => handleLike(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default CommunityForum;
