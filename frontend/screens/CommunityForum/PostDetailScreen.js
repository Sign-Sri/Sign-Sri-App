import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const PostDetailScreen = () => {
  const route = useRoute();
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostAndComments();
  }, []);

  const fetchPostAndComments = async () => {
    try {
      const postResponse = await axios.get(`http://localhost:5000/api/forum/posts`);
      const foundPost = postResponse.data.find((p) => p.postId === postId);
      setPost(foundPost);

      const commentsResponse = await axios.get(`http://localhost:5000/api/forum/posts/${postId}/comments`);
      setComments(commentsResponse.data);
    } catch (error) {
      console.error("Error fetching post/comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) {
      Alert.alert("Error", "Comment cannot be empty.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/forum/posts/${postId}/comments`, {
        userId: "testUser123",
        content: comment,
      });
      setComment("");
      fetchPostAndComments();
    } catch (error) {
      console.error("Error adding comment:", error);
      Alert.alert("Error", "Failed to add comment.");
    }
  };

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <View style={styles.container}>
      <Text style={styles.postContent}>{post?.content}</Text>
      <Text style={styles.timestamp}>{new Date(post?.timestamp).toLocaleString()}</Text>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.commentId}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.username}>{item.userId}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />

<TextInput style={styles.input} placeholder="Add a comment..." value={comment} onChangeText={setComment} />
      <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
        <Text style={styles.buttonText}>Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  postContent: { fontSize: 18, fontWeight: "bold" },
  timestamp: { fontSize: 12, color: "gray" },
  comment: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  input: { borderWidth: 1, padding: 8, marginTop: 10 },
  commentButton: { backgroundColor: "blue", padding: 10, marginTop: 10 },
  buttonText: { color: "white", textAlign: "center" },
});
export default PostDetailScreen;