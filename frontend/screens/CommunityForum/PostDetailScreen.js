import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Use Feather icons
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove, // Import arrayRemove for removing likes
  getDoc,
  getDocs, // Import getDocs for fetching replies
} from "firebase/firestore";
import { db, auth } from "../../config/firebaseConfig";
import { useRoute } from "@react-navigation/native";

const PostDetailScreen = () => {
  const route = useRoute();
  const { postId, postContent, postUsername } = route.params;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // Track which comment is being replied to
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState(null); // Track which comment is being edited
  const [editedComment, setEditedComment] = useState(""); // Track edited comment content
  const [likedComments, setLikedComments] = useState({}); // Track liked comments by the current user

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

      // Initialize likedComments state
      const user = auth.currentUser;
      if (user) {
        const likedCommentsData = {};
        commentsData.forEach((comment) => {
          if (comment.likedBy && comment.likedBy.includes(user.uid)) {
            likedCommentsData[comment.id] = true; // Mark comment as liked by the user
          }
        });
        setLikedComments(likedCommentsData);
      }

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
          }
        );
      } else {
        // Add a new top-level comment
        await addDoc(collection(db, "forumPosts", postId, "comments"), {
          userId: user.uid,
          username: user.displayName || "Anonymous",
          comment: comment,
          timestamp: serverTimestamp(),
          likes: 0, // Initialize likes to 0
          likedBy: [], // Initialize likedBy array
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

  // Handle liking/unliking a comment
  const handleLikeComment = async (commentId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to like a comment.");
        return;
      }

      const commentRef = doc(db, "forumPosts", postId, "comments", commentId);
      const commentSnapshot = await getDoc(commentRef);
      const commentData = commentSnapshot.data();

      // Check if the user has already liked the comment
      if (commentData.likedBy && commentData.likedBy.includes(user.uid)) {
        // User has already liked the comment, so remove the like
        await updateDoc(commentRef, {
          likes: increment(-1), // Decrement the like count
          likedBy: arrayRemove(user.uid), // Remove the user's ID from the likedBy array
        });

        // Update the likedComments state to mark the comment as unliked
        setLikedComments((prev) => ({ ...prev, [commentId]: false }));

        console.log("Like removed successfully!");
      } else {
        // User hasn't liked the comment, so add the like
        await updateDoc(commentRef, {
          likes: increment(1), // Increment the like count
          likedBy: arrayUnion(user.uid), // Add the user's ID to the likedBy array
        });

        // Update the likedComments state to mark the comment as liked
        setLikedComments((prev) => ({ ...prev, [commentId]: true }));

        console.log("Comment liked successfully!");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      Alert.alert("Error", "Failed to toggle like.");
    }
  };

  // Handle editing a comment
  const handleEditComment = async (commentId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to edit a comment.");
        return;
      }

      const commentRef = doc(db, "forumPosts", postId, "comments", commentId);
      await updateDoc(commentRef, {
        comment: editedComment, // Update the comment content
      });

      console.log("Comment edited successfully!");
      Alert.alert("Success", "Comment edited successfully!");

      // Reset editing state
      setEditingCommentId(null);
      setEditedComment("");
    } catch (error) {
      console.error("Error editing comment:", error);
      Alert.alert("Error", "Failed to edit the comment.");
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to delete a comment.");
        return;
      }

      // Show confirmation dialog
      Alert.alert(
        "Delete Comment",
        "Are you sure you want to delete this comment?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              const commentRef = doc(db, "forumPosts", postId, "comments", commentId);
              await deleteDoc(commentRef); // Delete the comment from Firestore
              console.log("Comment deleted successfully!");
              Alert.alert("Success", "Comment deleted successfully!");
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
      Alert.alert("Error", "Failed to delete the comment.");
    }
  };

  // Show edit/delete options when the user clicks the icon
  const showEditDeleteOptions = (commentId, commentContent) => {
    Alert.alert(
      "Options",
      "Choose an action:",
      [
        {
          text: "Edit",
          onPress: () => {
            setEditingCommentId(commentId); // Set the comment ID being edited
            setEditedComment(commentContent); // Pre-fill the input with the current content
          },
        },
        {
          text: "Delete",
          onPress: () => handleDeleteComment(commentId),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
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
            <View style={styles.commentHeader}>
              <Text style={styles.commentUser}>{item.username}:</Text>
              {/* Edit/Delete button (only visible to the comment owner) */}
              {item.userId === auth.currentUser?.uid && (
                <TouchableOpacity
                  style={styles.editDeleteButton}
                  onPress={() => showEditDeleteOptions(item.id, item.comment)}
                >
                  <Icon name="more-vertical" size={20} color="#666" />
                </TouchableOpacity>
              )}
            </View>
            {/* Show input field if the comment is being edited */}
            {editingCommentId === item.id ? (
              <TextInput
                style={styles.editInput}
                value={editedComment}
                onChangeText={setEditedComment}
                placeholder="Edit your comment..."
                multiline
              />
            ) : (
              <Text>{item.comment}</Text>
            )}
            <Text style={styles.commentTimestamp}>
              {item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleString() : "N/A"}
            </Text>

            {/* Like button for comments */}
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => handleLikeComment(item.id)}
            >
              <Icon
                name="thumbs-up"
                size={20}
                color={likedComments[item.id] ? "green" : "#666"} // Green if liked, gray if not
              />
              <Text style={[styles.likeText, { color: likedComments[item.id] ? "green" : "#666" }]}>
                {item.likes || 0} {/* Show the like count */}
              </Text>
            </TouchableOpacity>

            {/* Display replies */}
            {item.replies && item.replies.length > 0 && (
              <View style={styles.repliesContainer}>
                {item.replies.map((reply) => (
                  <View key={reply.id} style={styles.replyBox}>
                    <Text style={styles.replyUser}>{reply.username}:</Text>
                    <Text>{reply.reply}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Reply button (icon with reply count) */}
            <TouchableOpacity
              style={styles.replyButton}
              onPress={() => setReplyingTo(item.id)}
            >
              <Icon name="message-circle" size={20} color="#666" />
              {/* Display the number of replies */}
              {item.replies && item.replies.length > 0 && (
                <Text style={styles.replyCountText}>{item.replies.length}</Text>
              )}
            </TouchableOpacity>

            {/* Save button for editing */}
            {editingCommentId === item.id && (
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleEditComment(item.id)}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            )}
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
  commentHeader: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  commentUser: { fontWeight: "bold", flex: 1 },
  commentTimestamp: { marginTop: 5, fontSize: 12, color: "gray" },
  editDeleteButton: { padding: 5 },
  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  likeText: {
    marginLeft: 5,
    fontSize: 14,
  },
  repliesContainer: { marginLeft: 20, marginTop: 5 },
  replyBox: { borderLeftWidth: 2, borderLeftColor: "#ccc", paddingLeft: 10, marginBottom: 5 },
  replyUser: { fontWeight: "bold", fontSize: 14 },
  replyButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  replyCountText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginTop: 10 },
  commentButton: { backgroundColor: "blue", padding: 10, marginTop: 10, borderRadius: 5 },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
});

export default PostDetailScreen;