import api from './../utills/api';


export const fetchAllPosts = async () => {
    const response = await api.get('/api/community/posts');
    return response.data;
};

export const fetchPostById = async (postId) => {
    const response = await api.get(`/api/community/posts/${postId}`);
    return response.data;
};

export const createPost = async (postData) => {
    const response = await api.post('/api/community/posts', postData);
    return response.data;
};

export const addComment = async (postId, commentData) => {
    const response = await api.post(`/api/community/posts/${postId}/comments`, commentData);
    return response.data;
};
  
export const likePost = async (postId, userId) => {
    const response = await api.post(`/api/community/posts/${postId}/like`, { userId });
    return response.data;
};

