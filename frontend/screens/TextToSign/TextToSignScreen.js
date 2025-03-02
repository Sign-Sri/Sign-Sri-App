import { View, TextInput, StyleSheet, Text, Button, TouchableOpacity, Image, Modal, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
//import Slider from '@react-native-community/slider';
import React, { useState } from 'react';

const TextToSignScreen = () => {
  const [speed, setSpeed] = useState('Normal');
  const [text, setText] = useState('');
  const [aslGif, setAslGif] = useState(null);
  const [showAlphabetPanel, setShowAlphabetPanel] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const handleTextInputChange = (inputText) => {
    setText(inputText);
  };

  const handlePlay = () => {

    if(!text){
      setError ('Please enter the text');
      return;
    }

    setIsLoading(true);
    setError(null);

    try{
      const response = await fetch('http://localhost:3000/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,
            speed: speed,
        }),
      });

    };

    setAslGif(require('../../assets/ASL_output.gif'));
    setIsPlaying(true);
  };

  const handleStop = () => {
    setAslGif(null);
    setIsPlaying(false);
  };

  const handleViewAlphabet = () => {
    console.log("Alphabet Opened");
    setShowAlphabetPanel(true);
  };

  const handleCloseAlphabetPanel = () => {
    console.log("Close button pressed");
    setShowAlphabetPanel(false);
  };

  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

  const getImageForCharacter = (char) => {
    switch (char) {
      case 'a': return require('../../assets/ASLimages/a.png');
      case 'b': return require('../../assets/ASLimages/b.png');
      case 'c': return require('../../assets/ASLimages/c.png');
      case 'd': return require('../../assets/ASLimages/d.png');
      case 'e': return require('../../assets/ASLimages/e.png');
      case 'f': return require('../../assets/ASLimages/f.png');
      case 'g': return require('../../assets/ASLimages/g.png');
      case 'h': return require('../../assets/ASLimages/h.png');
      case 'i': return require('../../assets/ASLimages/i.png');
      case 'j': return require('../../assets/ASLimages/j.png');
      case 'k': return require('../../assets/ASLimages/k.png');
      case 'l': return require('../../assets/ASLimages/l.png');
      case 'm': return require('../../assets/ASLimages/m.png');
      case 'n': return require('../../assets/ASLimages/n.png');
      case 'o': return require('../../assets/ASLimages/o.png');
      case 'p': return require('../../assets/ASLimages/p.png');
      case 'q': return require('../../assets/ASLimages/q.png');
      case 'r': return require('../../assets/ASLimages/r.png');
      case 's': return require('../../assets/ASLimages/s.png');
      case 't': return require('../../assets/ASLimages/t.png');
      case 'u': return require('../../assets/ASLimages/u.png');
      case 'v': return require('../../assets/ASLimages/v.png');
      case 'w': return require('../../assets/ASLimages/w.png');
      case 'x': return require('../../assets/ASLimages/x.png');
      case 'y': return require('../../assets/ASLimages/y.png');
      case 'z': return require('../../assets/ASLimages/z.png');
      case '0': return require('../../assets/ASLimages/0.png');
      case '1': return require('../../assets/ASLimages/1.png');
      case '2': return require('../../assets/ASLimages/2.png');
      case '3': return require('../../assets/ASLimages/3.png');
      case '4': return require('../../assets/ASLimages/4.png');
      case '5': return require('../../assets/ASLimages/5.png');
      case '6': return require('../../assets/ASLimages/6.png');
      case '7': return require('../../assets/ASLimages/7.png');
      case '8': return require('../../assets/ASLimages/8.png');
      case '9': return require('../../assets/ASLimages/9.png');
      default: return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >

    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={handleTextInputChange}
        placeholder="Enter Text"
        style={styles.input}
        placeholderTextColor="#2C3E50"
      />

      <Text style={styles.label}>
        Speed
      </Text>

      <View style={styles.speedContainer}>
        {['Slow', 'Normal', 'Fast'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.speedButton, speed === option && styles.selectedSpeedButton]}
            onPress={() => setSpeed(option)}
          >
            <Text style={[styles.speedButtonText, speed === option && styles.selectedSpeedButtonText]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Play" color="#3498DB" onPress={handlePlay} />

        <Button title="View Alphabet" color="#2ECC71" onPress={handleViewAlphabet} />

        <Button title="Stop" color="#E74C3C" onPress={handleStop} />
      </View>

      {/* {aslGif && (
        <View style={styles.outputContainer}>
          <Image source={aslGif} style={styles.gif} />

          <Text style={styles.outputText}>
            Entered Text: {text}
          </Text>

          <Text style={styles.outputText}>
            Speed: {speed}
          </Text>
        </View>
      )} */}

      <View style={styles.outputContainer}>
        {isPlaying ? (
          <>
            <Image source={aslGif} style={styles.gif} />
            <Text style={styles.outputText}>
              Entered Text: {text}
            </Text>
            <Text style={styles.outputText}>
              Speed: {speed}
            </Text>
          </>
        ) : (
          <Text style={styles.instructionsText}>
            To see the ASL output:
            {"\n\n"}
            1. Enter text in the input field above.
            {"\n"}
            2. Select the desired speed (Slow, Normal, Fast).
            {"\n"}
            3. Press the "Play" button to generate the ASL output.
          </Text>
        )}
      </View>

      <Modal visible={showAlphabetPanel} transparent={true} animationType="slide" onRequestClose={handleCloseAlphabetPanel}>
        <View style={styles.modalContainer}>

          {/* <Button style={styles.closeButton}
            title="Close" 
            onPress={handleCloseAlphabetPanel}
          />   */}

          <View >
            <Button title="Close" color="#d4d8d9" onPress={handleCloseAlphabetPanel} />
          </View>

          <ScrollView contentContainerStyle={styles.gridContainer}>
            {alphabet.map((char, index) => (
              <View key={index} style={styles.tile}>
                <Image source={getImageForCharacter(char)} style={styles.tileImage} />
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>

    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ECF0F1',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#172937',
    backgroundColor: '#fff',
    color: '#2C3E50',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '600',
    color: '#2C3E50',
  },
  speedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  speedButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#172937',
    backgroundColor:'#172937' ,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedSpeedButton: {
    //backgroundColor: '#3498DB',
    backgroundColor: '#172937',
    borderColor: '#79dd09',
  },
  speedButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  selectedSpeedButtonText: {
    color: '#79dd09',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  outputContainer: {
    marginTop: 30,
    padding: 20,
    //backgroundColor: '#2980B9',
    backgroundColor: '#172937',
    borderRadius: 10,
    alignItems: 'center',

    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outputText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#ECF0F1',
  },
  gif: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },

  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF0F1', 
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 50,
    paddingBottom: 50,
  },
  tile: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#172937',
    backgroundColor: '#fff', 
  },
  tileImage: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
  
  instructionsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ECF0F1',
    textAlign: 'center',
    lineHeight: 24,
  },

});

export default TextToSignScreen;