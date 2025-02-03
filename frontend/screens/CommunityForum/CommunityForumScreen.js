import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react';


const CommunityForumScreen = () => {

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  

    // handle the sent message with delete button
    const sendMessage = () => {
      if (inputText.trim().length > 0) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now().toString(), text: inputText }
        ]);
        setInputText(''); // Clear input after sending
      }
    };

    // Function to delete a message
    const deleteMessage = (id) => {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    };

  return (
    <View style={styles.container}>

      // header part
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Post</Text>
      
      // next button
        <TouchableOpacity>
          <Text style={styles.nextButton}>Next</Text>
        </TouchableOpacity>
      </View>

      // user information part
      <View style={styles.userInfoContainer}>
        {/* Profile Icon */}
        <View style={styles.profilePic} />

        {/* User Info (Username and Friends Button in Separate Rows) */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>User_name</Text>

          {/* Friends Button in a Separate Row */}
          <TouchableOpacity style={styles.friendsButton}>
            <Text style={styles.friendsButtonText}>Friends</Text>
          </TouchableOpacity> 
        </View>
      </View>

      // display sent message
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteMessage(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      //buttons photo, video, feeling
      <View style={styles.optionsBar}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Photo/Video</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Feeling</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Live</Text>
        </TouchableOpacity>
      </View>

      // message typing bar
     <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          multiline={true}
        /> 

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

  // text input container
  input: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  //message container style
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    marginHorizontal: 10,
  },

  //text message
  messageText: {
    fontSize: 16,
    color: '#333',
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