import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { getPosts, likePost } from "../api/community";

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getPosts();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <View>
      <Text>Community Forum</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.username}: {item.content}</Text>
            <Button title="Like" onPress={() => likePost(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default CommunityForum;
