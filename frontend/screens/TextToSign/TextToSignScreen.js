import { View, TextInput, StyleSheet, Text, Switch, Button, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';

const TextToSignScreen = () => {
  const [speed, setSpeed] = useState('Normal');
  const [text, setText] = useState('');
  const [aslGif, setAslGif] = useState(null);

  const handleTextInputChange = (inputText) => {
    setText(inputText);
  };

  const handlePlay = () => {
    setAslGif(require('../../assets/ASL_output.gif'));
  };

  const handleStop = () => {
    setAslGif(null);
  };

  return (
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
        <Button title="Stop" color="#E74C3C" onPress={handleStop} />
      </View>

      {aslGif && (
        <View style={styles.outputContainer}>
          <Image source={aslGif} style={styles.gif} />

          <Text style={styles.outputText}>
            Entered Text: {text}
          </Text>

          <Text style={styles.outputText}>
            Speed: {speed}
          </Text>
        </View>
      )}

      <Modal visible={showAlphabetPanel} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseAlphabetPanel}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

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
    borderColor: '#3498DB',
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
    borderColor: '#3498DB',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedSpeedButton: {
    backgroundColor: '#3498DB',
  },
  speedButtonText: {
    color: '#3498DB',
    fontWeight: '600',
  },
  selectedSpeedButtonText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  outputContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#2980B9',
    borderRadius: 10,
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
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50', 
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 50,
  },
  tile: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3498DB',
    backgroundColor: '#fff', 
  },
  tileImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  }
  
});

export default TextToSignScreen;