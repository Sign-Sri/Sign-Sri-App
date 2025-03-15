import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, TextInput, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import * as ImagePicker from "react-native-image-picker";

const API_URL = "http://localhost:5000/api/community";

const CommunityForumScreen = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/getPosts`);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async () => {
    try {
      const formData = new FormData();
      formData.append("text", text);
      if (selectedImage) {
        formData.append("file", {
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.fileName,
        });
      }

      await axios.post(`${API_URL}/createPost`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setText("");
      setSelectedImage(null);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const selectImage = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (!response.didCancel && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  return (
    <View>
      <TextInput value={text} onChangeText={setText} placeholder="Write a post..." />
      <Button title="Choose Image" onPress={selectImage} />
      {selectedImage && <Image source={{ uri: selectedImage.uri }} style={{ width: 100, height: 100 }} />}
      <Button title="Post" onPress={createPost} />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
            {item.fileUrl && <Image source={{ uri: item.fileUrl }} style={{ width: 100, height: 100 }} />}
            <TouchableOpacity onPress={() => axios.post(`${API_URL}/likePost/${item.id}`)}>
              <Text>❤️ {item.likes}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default CommunityForumScreen;
