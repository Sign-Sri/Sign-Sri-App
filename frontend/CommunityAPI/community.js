const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Create a new post 
export const createPost = async (uid, firstName, lastName, content, imageUrl) => {
    try {
        const response = await fetch(`${API_URL}/createPost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, firstName, lastName,  content, imageUrl }),
    });
    if (!response.ok) {
      throw new Error("Http error! status: $ {response.status}");
    }
    return await response.json(); // Return the response as JSON
  } catch (error) {
    console.error("Error creating post:", error); // Log error if it happens
    throw error;
  }
};

// Fetch all posts
export const getPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/getPosts`);
      if (!response.ok) {
        throw new Error("HTTP error ! status: ${response.status}")
      }
      return await response.json(); // Return the list of posts as JSON
    } catch (error) {
      console.error("Error fetching posts:", error); // Log error if it happens
      throw error;
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
      if (!response.ok) {
        throw new Error("HTTP error ! status: ${response.status}")
      }
      return await response.json(); // Return the updated post as JSON
    } catch (error) {
      console.error("Error liking post:", error); // Log error if it happens
      throw error;
    }
  };