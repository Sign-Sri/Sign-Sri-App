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
  const [editingReplyId, setEditingReplyId] = useState(null); // Track which reply is being edited
  const [editedComment, setEditedComment] = useState(""); // Track edited comment content
  const [editedReply, setEditedReply] = useState(""); // Track edited reply content
  const [likedComments, setLikedComments] = useState({}); // Track liked comments by the current user
  const [likedReplies, setLikedReplies] = useState({}); // Track liked replies by the current user
  const [commentCount, setCommentCount] = useState(0); // Track the total number of comments

  // Fetch comments and their replies for the post
  const getUserFirstName = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        return userDoc.data().firstName || "User";
      }
      return "User";
    } catch (error) {
      console.error("Error fetching user data:", error);
      return "User";
    }
  };

  useEffect(() => {
    const q = query(collection(db, "forumPosts", postId, "comments"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const commentsData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const commentData = { id: doc.id, ...doc.data() };
          
          // Get the user's firstName for the comment
          commentData.firstName = await getUserFirstName(commentData.userId);
          
          // Fetch replies for each comment
          const repliesQuery = query(
            collection(db, "forumPosts", postId, "comments", doc.id, "replies"),
            orderBy("timestamp", "asc")
          );
          const repliesSnapshot = await getDocs(repliesQuery);
          
          // Process replies with firstName
          commentData.replies = await Promise.all(
            repliesSnapshot.docs.map(async (replyDoc) => {
              const replyData = { id: replyDoc.id, ...replyDoc.data() };
              // Get the user's firstName for the reply
              replyData.firstName = await getUserFirstName(replyData.userId);
              return replyData;
            })
          );
          
          return commentData;
        })
      );
      setComments(commentsData);

      // Initialize likedComments and likedReplies state
      const user = auth.currentUser;
      if (user) {
        const likedCommentsData = {};
        const likedRepliesData = {};
        commentsData.forEach((comment) => {
          const likedBy = comment.likedBy || [];
          if (likedBy.includes(user.uid)) {
            likedCommentsData[comment.id] = true;
          }
          comment.replies.forEach((reply) => {
            const replyLikedBy = reply.likedBy || [];
            if (replyLikedBy.includes(user.uid)) {
              likedRepliesData[reply.id] = true;
            }
          });
        });
        setLikedComments(likedCommentsData);
        setLikedReplies(likedRepliesData);
      }

      setCommentCount(commentsData.length);
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
            likes: 0, // Initialize likes to 0
            likedBy: [], // Initialize likedBy array
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

        // Increment the commentCount in the local state
        setCommentCount((prevCount) => prevCount + 1);
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

  // Handle editing a comment
  const handleEditComment = async (commentId) => {
    if (!editedComment.trim()) {
      Alert.alert("Error", "Comment cannot be empty.");
      return;
    }

    try {
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

  // Handle editing a reply
  const handleEditReply = async (commentId, replyId) => {
    if (!editedReply.trim()) {
      Alert.alert("Error", "Reply cannot be empty.");
      return;
    }

    try {
      const replyRef = doc(db, "forumPosts", postId, "comments", commentId, "replies", replyId);
      await updateDoc(replyRef, {
        reply: editedReply, // Update the reply content
      });

      console.log("Reply edited successfully!");
      Alert.alert("Success", "Reply edited successfully!");

      // Reset editing state
      setEditingReplyId(null);
      setEditedReply("");
    } catch (error) {
      console.error("Error editing reply:", error);
      Alert.alert("Error", "Failed to edit the reply.");
    }
  };

  // Handle deleting a reply
  const handleDeleteReply = async (commentId, replyId) => {
    try {
      // Show confirmation dialog
      Alert.alert(
        "Delete Reply",
        "Are you sure you want to delete this reply?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              const replyRef = doc(db, "forumPosts", postId, "comments", commentId, "replies", replyId);
              await deleteDoc(replyRef); // Delete the reply from Firestore
              console.log("Reply deleted successfully!");
              Alert.alert("Success", "Reply deleted successfully!");
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error("Error deleting reply:", error);
      Alert.alert("Error", "Failed to delete the reply.");
    }
  };

  // Handle liking/unliking comments and replies
  const handleLike = async (commentId, replyId = null) => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "You must be logged in to like a comment or reply.");
      return;
    }

    try {
      if (replyId) {
        // Handle liking/unliking a reply
        const replyRef = doc(db, "forumPosts", postId, "comments", commentId, "replies", replyId);
        const replyDoc = await getDoc(replyRef);
        const replyData = replyDoc.data();

        // Ensure likedBy is an array
        const likedBy = replyData.likedBy || [];

        if (likedBy.includes(user.uid)) {
          // User already liked the reply, so unlike it
          await updateDoc(replyRef, {
            likes: increment(-1),
            likedBy: arrayRemove(user.uid),
          });
          setLikedReplies((prev) => ({ ...prev, [replyId]: false }));
        } else {
          // User is liking the reply
          await updateDoc(replyRef, {
            likes: increment(1),
            likedBy: arrayUnion(user.uid),
          });
          setLikedReplies((prev) => ({ ...prev, [replyId]: true }));
        }
      } else {
        // Handle liking/unliking a comment
        const commentRef = doc(db, "forumPosts", postId, "comments", commentId);
        const commentDoc = await getDoc(commentRef);
        const commentData = commentDoc.data();

        // Ensure likedBy is an array
        const likedBy = commentData.likedBy || [];

        if (likedBy.includes(user.uid)) {
          // User already liked the comment, so unlike it
          await updateDoc(commentRef, {
            likes: increment(-1),
            likedBy: arrayRemove(user.uid),
          });
          setLikedComments((prev) => ({ ...prev, [commentId]: false }));
        } else {
          // User is liking the comment
          await updateDoc(commentRef, {
            likes: increment(1),
            likedBy: arrayUnion(user.uid),
          });
          setLikedComments((prev) => ({ ...prev, [commentId]: true }));
        }
      }
    } catch (error) {
      console.error("Error liking/unliking:", error);
      Alert.alert("Error", "Failed to like/unlike.");
    }
  };

  // Show edit/delete options for comments
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

  // Show edit/delete options for replies
  const showEditDeleteOptionsForReply = (commentId, replyId, replyContent) => {
    Alert.alert(
      "Options",
      "Choose an action:",
      [
        {
          text: "Edit",
          onPress: () => {
            setEditingReplyId(replyId); // Set the reply ID being edited
            setEditedReply(replyContent); // Pre-fill the input with the current content
          },
        },
        {
          text: "Delete",
          onPress: () => handleDeleteReply(commentId, replyId),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) return <ActivityIndicator size="large" color="#182a38" />;

  return (
    <View style={styles.container}>
      <Text style={styles.postTitle}>{postUsername}:</Text>
      <Text style={styles.postContent}>{postContent}</Text>

      {/* Display the total number of comments */}
      <Text style={styles.commentCountText}>Comments: {commentCount}</Text>

      {/* Display comments and replies */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentUser}>{item.firstName}:</Text>
              {/* Edit/Delete button (only visible to the comment owner) */}
              {item.userId === auth.currentUser?.uid && (
                <TouchableOpacity
                  style={styles.editDeleteButton}
                  onPress={() => showEditDeleteOptions(item.id, item.comment)}
                >
                  <Icon name="more-vertical" size={22} color="#ffffff" />
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
              <Text style={styles.commentText}>{item.comment}</Text>
            )}
            <Text style={styles.commentTimestamp}>
              {item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleString() : "N/A"}
            </Text>

            {/* Like and reply buttons in a single row */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.likeButton}
                onPress={() => handleLike(item.id)}
              >
                <Icon
                  name="thumbs-up"
                  size={28}
                  color={likedComments[item.id] ? "#79DD09" : "#666"} // Green if liked, gray if not
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.replyButton}
                onPress={() => setReplyingTo(item.id)}
              >
                <Icon name="message-circle" size={25} color="#79DD09" />
                {/* Display the number of replies */}
                {item.replies && item.replies.length > 0 && (
                  <Text style={styles.replyCountText}>{item.replies.length}</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Display replies */}
            {item.replies && item.replies.length > 0 && (
              <View style={styles.repliesContainer}>
                {item.replies.map((reply) => (
                  <View key={reply.id} style={styles.replyBox}>
                    <View style={styles.replyHeader}>
                      <Text style={styles.replyUser}>{reply.firstName}:</Text>
                      {/* Edit/Delete button for replies (only visible to the reply owner) */}
                      {reply.userId === auth.currentUser?.uid && (
                        <TouchableOpacity
                          style={styles.editDeleteButton}
                          onPress={() => showEditDeleteOptionsForReply(item.id, reply.id, reply.reply)}
                        >
                          <Icon name="more-vertical" size={22} color="#ffffff" />
                        </TouchableOpacity>
                      )}
                    </View>
                    {/* Show input field if the reply is being edited */}
                    {editingReplyId === reply.id ? (
                      <TextInput
                        style={styles.editInput}
                        value={editedReply}
                        onChangeText={setEditedReply}
                        placeholder="Edit your reply..."
                        multiline
                      />
                    ) : (
                      <Text style={styles.replyText}>{reply.reply}</Text>
                    )}
                    {/* Like button for replies */}
                    <TouchableOpacity
                      style={styles.likeButton}
                      onPress={() => handleLike(item.id, reply.id)}
                    >
                      <Icon
                        name="thumbs-up"
                        size={25}
                        color={likedReplies[reply.id] ? "#79DD09" : "#666"} // Green if liked, gray if not
                      />
                    </TouchableOpacity>
                    {/* Save button for editing replies */}
                    {editingReplyId === reply.id && (
                      <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => handleEditReply(item.id, reply.id)}
                      >
                        <Text style={styles.saveButtonText}>Save</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Save button for editing comments */}
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
      <TouchableOpacity 
        style={styles.commentButton} onPress={handleAddComment}
      >
        <Text style={styles.buttonText}>{replyingTo ? "Reply" : "Comment"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  postTitle: { fontWeight: "bold", fontSize: 10 },
  postContent: { fontSize: 30, marginBottom: 10, color: "#79DD09"},
  commentCountText: { fontSize: 14, color: "black", marginBottom: 10, fontWeight: "bold" }, // Style for comment count
  commentBox: { borderBottomWidth: 1, padding: 5, marginBottom: 5, borderRadius: 20, backgroundColor: "#182a38" },
  commentHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20,}, // Updated for right-aligned icon
  commentUser: { fontWeight: "bold", color :"#ffffff" , fontSize: 20}, // Removed flex: 1 to allow space for the icon
  commentText: { color: "#ffffff" }, // Added for white text color
  commentTimestamp: { marginTop: 5, fontSize: 12, color: "#ffffff" },
  editDeleteButton: { padding: 5,},
  editInput: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    fontSize: 18,
    backgroundColor: "#ffffff"
  },
  saveButton: {
    backgroundColor: "#79DD09",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
    borderWidth: 3,
  },
  saveButtonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  likeButton: {
    marginRight: 10,
  },
  repliesContainer: { marginLeft: 20, marginTop: 5, borderColor:"#ffffff",  },
  replyBox: { borderLeftWidth: 2, borderLeftColor: "#35d0fe", paddingLeft: 10, marginBottom: 5, },
  replyHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, }, // Updated for right-aligned icon
  replyUser: { fontWeight: "bold", fontSize: 15, color:"#ffffff" }, // Removed flex: 1 to allow space for the icon
  replyText: { color: "#ffffff" }, // Added for white text color
  replyButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  replyCountText: {
    marginLeft: 5,
    fontSize: 14,
    color:"#ffffff",
  },
  input: { borderWidth: 3, borderColor: "#182a38", padding: 10, borderRadius: 50, marginBottom:30 },
  commentButton: { padding: 10,marginBottom:50, borderRadius: 20, backgroundColor: "#79DD09" },
  buttonText: { color: "white", textAlign: "center", fontSize: 18, fontWeight: "bold" },
});

export default PostDetailScreen;