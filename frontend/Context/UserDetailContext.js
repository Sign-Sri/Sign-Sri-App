import React, { useContext, useState } from 'react';
import { ForumContext } from './context/ForumContext';

const CreatePostScreen = () => {
    const { createPost } = useContext(ForumContext);
    const [postContent, setPostContent] = useState('');

    const handleCreatePost = () => {
        const newPost = { id: Date.now(), content: postContent };
        createPost(newPost);
        setPostContent('');
    };

    return (
        <div>
            <textarea 
                value={postContent} 
                onChange={(e) => setPostContent(e.target.value)} 
                placeholder="Write your post here"
            />
            <button onClick={handleCreatePost}>Create Post</button>
        </div>
    );
};
