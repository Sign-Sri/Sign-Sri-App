const API_URL = "http://localhost:5000";

// Create a new post 
export const createPost = async (uid, firstName, lastName, content, imageUrl) => {
    try {
        const response = await fetch(`${API_URL}/createPost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, firstName, lastName,  content, imageUrl }),
    });
    return await response.json(); // Return the response as JSON
  } catch (error) {
    console.error("Error creating post:", error); // Log error if it happens
  }
};

// Fetch all posts
export const getPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/getPosts`);
      return await response.json(); // Return the list of posts as JSON
    } catch (error) {
      console.error("Error fetching posts:", error); // Log error if it happens
    }
  };

  // Like a post
export const likePost = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/likePost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      return await response.json(); // Return the updated post as JSON
    } catch (error) {
      console.error("Error liking post:", error); // Log error if it happens
    }
  };