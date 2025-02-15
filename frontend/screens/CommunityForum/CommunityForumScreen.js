import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, Image } from 'react-native'
import React from 'react'
import { useState, useRef, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const CommunityForumScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isFeelingModalVisible, setIsFeelingModalVisible] = useState(false);
  const currentFeeling = useRef(null);  // Ref for the *selected* feeling
  const [displayedFeeling, setDisplayedFeeling] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [isFriendsModalVisible, setIsFriendsModalVisible] = useState(false);
  const [friends, setFriends] = useState([ // Sample friend data - replace with your data
    { id: 1, name: 'Alice'}, // Example image path
    { id: 2, name: 'Bob'},
    { id: 3, name: 'Charlie'},
    // ... more friends
  ]);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
  
      const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasMediaPermission(mediaStatus.status === 'granted');
    })();
  }, []);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const deleteImage = () => {  // Function to delete the image
    setImage(null);
  };

  const feelings = [
    { name: 'Happy', emoji: '\u{1F60A}' },
    { name: 'Sad', emoji: '\u{1F622}' },
    { name: 'Excited', emoji: '\u{1F606}' },
    { name: 'Angry', emoji: '\u{1F620}' },
    { name: 'Relaxed', emoji: '\u{1F60C}' },
    
  ];

  const handleFeelingPress = (feeling) => {
    currentFeeling.current = feeling;
    setDisplayedFeeling(feeling);
    setIsFeelingModalVisible(false);
  };

    // handle the sent message with delete button
    const sendMessage = () => {
      if (inputText.trim().length > 0 || currentFeeling.current) {
        const newMessage = { 
          id: Date.now().toString(), 
          text: inputText, 
          feeling:currentFeeling.current, 
        };
    
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputText('');
      }
    };

    // Function to delete a message
    const deleteMessage = (id) => {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    };

    const removeCurrentFeeling = () => {
      currentFeeling.current = null;  // Clear the ref
      setDisplayedFeeling(null);
      
    };

    
  return (
    <View style={styles.container}>

      // header part
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Post</Text>
      
      // next button
        <TouchableOpacity onPress={()=>navigation.navigate('SortBy')}>
          <Text style={styles.nextButton}>Next</Text>
        </TouchableOpacity>
      </View>

      // user information part
      <View style={styles.userInfoContainer}>
        {/* Profile Icon */}
        <View style={styles.profilePic}/>

        //user name
        <View style={styles.userInfo}>
          <Text style={styles.userName}>User_name</Text>

          //Friends button
          <TouchableOpacity 
            style={styles.friendsButton} 
            onPress={() => setIsFriendsModalVisible(true)}
          >
            <Text style={styles.friendsButtonText}>Friends</Text>
          </TouchableOpacity> 
        </View>
        <Modal
        visible={isFriendsModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Friends</Text>  {/* The title */}
            
            <FlatList
              data={friends}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.friendItem}> {/* Container for each friend */}
                  <Image source={item.image} style={styles.friendImage} /> {/* Friend's image */}
                  <Text>{item.name}</Text>
                  <TouchableOpacity style={styles.addButton}> {/* Add button */}
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              )}
            />


            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsFriendsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      </View>

      // display sent message
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageOuterContainer}>
          <View style={styles.messageRow}> {/* Row for message and delete button */}
            <View style={styles.messageContent}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
            <TouchableOpacity
              onPress={() => deleteMessage(item.id)}
              style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      inverted={true}/> 

    {/* Current Feeling Display (outside FlatList) */}
    {displayedFeeling && (
        <View style={styles.currentFeelingContainer}>
          
            <Text style={styles.currentFeelingText}>
            {displayedFeeling.emoji} {displayedFeeling.name}</Text>
          
          <TouchableOpacity
            style={styles.removeButton} onPress={removeCurrentFeeling}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}


      //buttons photo, video, feeling
      <View style={styles.optionsBar}>

        {/* Display the selected image */}
      {image && (
        <View style={styles.imageContainer}> {/* Add a style for the image container */}
          <Image source={{ uri: image }} style={styles.pickedImage} /> {/* Add a style for the Image */}
          <TouchableOpacity style={styles.deleteImageButton} onPress={deleteImage}>  {/* Delete button */}
            <Text style={styles.deleteImageButtonText}>Delete Image</Text>
          </TouchableOpacity>
        </View>
      )}

        <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
          <Text style={styles.optionText}>Insert a Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => setIsFeelingModalVisible(true)}>
          <Text style={styles.optionText}>Feeling/Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Live</Text>
        </TouchableOpacity>
      </View>

      

       {/* Feeling Modal */}
      <Modal
        visible={isFeelingModalVisible}
        animationType="slide"
        transparent={true} // Make background transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList // Use FlatList for better performance with many feelings
              data={feelings}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.feelingButton}
                  onPress={() => handleFeelingPress(item)}>
                  <Text style={styles.feelingText}>{item.emoji} {item.name}</Text>
                </TouchableOpacity>
              )}/>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setIsFeelingModalVisible(false)}> // Close modal
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> 

      // message typing bar
     <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          multiline={true}/> 

        // send button
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>       
    </View>
  );
};

const styles = StyleSheet.create({
  //header container
  container: {
    flex: 1,
    backgroundColor: '#f2f6ff',
  },

  //header row style
  header: {
    backgroundColor: '#16467D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  //header title style
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 120
  },

  //next button text style
  nextButton: {
    color: '#fff',
    fontSize: 16,
  },

  //user informatin container
  userInfoContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },

  //profile pic style
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#696262',
    marginRight: 10,
  },

  //user name style
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  //friends button style
  friendsButton: {
    backgroundColor: '#9ec2f5',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginTop: 5,
  },

  //friends button text
  friendsButtonText: {
    color: '#fff',
    fontSize: 14,
  },

  //friends botton modal container
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center', // Center content within the modal
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  friendItem: { // Style for the container of each friend
    flexDirection: 'row', // Arrange image, name, and button horizontally
    alignItems: 'center', // Vertically align them
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  friendImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  addButton: {
    backgroundColor: 'green', // Or any color you prefer
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 'auto', // Push the button to the right
  },
  addButtonText: {
    color: 'white',
  },

  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20, // Add some top margin
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
  },

  messageOuterContainer: {
    marginBottom: 5,
    marginHorizontal: 10,
  },

  messageRow: { // NEW: Row for message and delete
    flexDirection: 'row',
    alignItems: 'flex-start', // Align to top
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
  },

  messageContent: {
    flex: 1, // Allow text to expand
    marginRight: 10,
  },

  //text message
  messageText: {
    fontSize: 16,
    color: '#333',
  },

  currentFeelingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 10,
  },

  currentFeelingText: {
    fontSize: 14,
    color: 'gray',
    marginRight: 5,
  },


  feelingRow: { // NEW: Row for feeling and remove
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5, // Space below message
    marginLeft: 10, // Indent from left
  },

  feelingContainer: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
    marginRight: 5, // Space between feeling text and remove button
  },

  feelingText: {
    fontSize: 14,
    color: 'gray',
  },

  removeButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
  },

  removeButtonText: {
    color: 'white',
    fontSize: 12,
  },

   //delete button
   deleteButton: {
    backgroundColor: '#007aff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 10,
    
  },

  //delete text style
  deleteText: {
    color: 'white',
    fontSize: 14,
  },

  //style for container of the image
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,       
  },

  //style for image component
  pickedImage: {
    width: 200,     
    height: 200,         
    resizeMode: 'contain',
  },

  //image delete button style
  deleteImageButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 2, 
  },

  //image delete button text style
  deleteImageButtonText: { 
    color: 'white',
    fontSize: 12,
  },

  
  //option bar container
    optionsBar: {
    paddingHorizontal: 100,
    marginVertical: 5,
    
  },

  //option button style
  optionButton: {
    backgroundColor: '#9ec2f5',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10, // Space between buttons
    alignItems: 'center',
  },

  // option button text styles
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  //feeling modal container
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust width as needed
  },

  feelingButton: {
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  feelingText: {
    fontSize: 16,
  },

  closeButton: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },

  //input message container style
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },

  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  //send button style
  sendButton: {
    backgroundColor: '#007aff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 10,
  },

  //send button text style
  sendText: {
    color: 'white',
    fontSize: 16,
  },


})

export default CommunityForumScreen