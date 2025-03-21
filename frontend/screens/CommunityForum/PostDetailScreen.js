import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { useRoute } from "@react-navigation/native";

const PostDetailScreen = () => {
  const route = useRoute();
  const { postId, postContent, postUsername } = route.params;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // Track which comment is being replied to
  const [loading, setLoading] = useState(true);

  // Fetch comments and their replies for the post
  useEffect(() => {
    const q = query(collection(db, "forumPosts", postId, "comments"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const commentsData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const commentData = { id: doc.id, ...doc.data() };
          // Fetch replies for each comment
          const repliesQuery = query(
            collection(db, "forumPosts", postId, "comments", doc.id, "replies"),
            orderBy("timestamp", "asc")
          );
          const repliesSnapshot = await getDocs(repliesQuery);
          commentData.replies = repliesSnapshot.docs.map((replyDoc) => ({
            id: replyDoc.id,
            ...replyDoc.data(),
          }));
          return commentData;
        })
      );
      setComments(commentsData);
      setLoading(false);
    });
    return unsubscribe;
  }, [postId]);

  // Handle adding a new comment or reply
  const handleAddComment = async () => {
    if (!comment.trim()) {
      Alert.alert("Error", "Comment cannot be empty.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to comment.");
        return;
      }

      if (replyingTo) {
        // Add a reply to a comment
        await addDoc(
          collection(db, "forumPosts", postId, "comments", replyingTo, "replies"),
          {
            userId: user.uid,
            username: user.displayName || "Anonymous",
            reply: comment,
            timestamp: serverTimestamp(),
            likes: 0, // Initialize likes for the reply
          }
        );
      } else {
        // Add a new top-level comment
        await addDoc(collection(db, "forumPosts", postId, "comments"), {
          userId: user.uid,
          username: user.displayName || "Anonymous",
          comment: comment,
          timestamp: serverTimestamp(),
          likes: 0, // Initialize likes for the comment
        });
      }

      // Increment the commentCount in the post document
      const postRef = doc(db, "forumPosts", postId);
      await updateDoc(postRef, {
        commentCount: increment(1),
      });

      console.log("Comment/Reply added and commentCount incremented successfully!");
      setComment(""); // Clear input after posting
      setReplyingTo(null); // Reset replying state
    } catch (error) {
      console.error("Error adding comment/reply:", error);
      Alert.alert("Error", "Failed to add comment/reply.");
    }
  };

  // Handle liking a comment or reply
  const handleLike = async (commentId, isReply = false, replyId = null) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to like a comment/reply.");
        return;
      }

      let ref;
      if (isReply) {
        // Like a reply
        ref = doc(db, "forumPosts", postId, "comments", commentId, "replies", replyId);
      } else {
        // Like a comment
        ref = doc(db, "forumPosts", postId, "comments", commentId);
      }

      await updateDoc(ref, {
        likes: increment(1),
      });

      console.log("Like added successfully!");
    } catch (error) {
      console.error("Error liking comment/reply:", error);
      Alert.alert("Error", "Failed to like the comment/reply.");
    }
  };

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <View style={styles.container}>
      <Text style={styles.postTitle}>{postUsername}:</Text>
      <Text style={styles.postContent}>{postContent}</Text>

      {/* Display comments and replies */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <Text style={styles.commentUser}>{item.username}:</Text>
            <Text>{item.comment}</Text>

            {/* Display likes for the comment */}
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => handleLike(item.id)}
            >
              <Text style={styles.likeText}>👍 {item.likes || 0}</Text>
            </TouchableOpacity>

            {/* Display replies */}
            {item.replies && item.replies.length > 0 && (
              <View style={styles.repliesContainer}>
                {item.replies.map((reply) => (
                  <View key={reply.id} style={styles.replyBox}>
                    <Text style={styles.replyUser}>{reply.username}:</Text>
                    <Text>{reply.reply}</Text>

                    {/* Display likes for the reply */}
                    <TouchableOpacity
                      style={styles.likeButton}
                      onPress={() => handleLike(item.id, true, reply.id)}
                    >
                      <Text style={styles.likeText}>👍 {reply.likes || 0}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Reply button */}
            <TouchableOpacity
              style={styles.replyButton}
              onPress={() => setReplyingTo(item.id)}
            >
              <Text style={styles.replyButtonText}>Reply</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add a new comment or reply */}
      <TextInput
        style={styles.input}
        placeholder={replyingTo ? "Write a reply..." : "Write a comment..."}
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
        <Text style={styles.buttonText}>{replyingTo ? "Reply" : "Comment"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  postTitle: { fontWeight: "bold", fontSize: 18 },
  postContent: { fontSize: 16, marginBottom: 10 },
  commentBox: { borderBottomWidth: 1, padding: 5, marginBottom: 5 },
  commentUser: { fontWeight: "bold" },
  repliesContainer: { marginLeft: 20, marginTop: 5 },
  replyBox: { borderLeftWidth: 2, borderLeftColor: "#ccc", paddingLeft: 10, marginBottom: 5 },
  replyUser: { fontWeight: "bold", fontSize: 14 },
  likeButton: { marginTop: 5 },
  likeText: { color: "blue", fontSize: 14 },
  replyButton: { marginTop: 5 },
  replyButtonText: { color: "blue", fontSize: 14 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginTop: 10 },
  commentButton: { backgroundColor: "blue", padding: 10, marginTop: 10, borderRadius: 5 },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
});

export default PostDetailScreen;