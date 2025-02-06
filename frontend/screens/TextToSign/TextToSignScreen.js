import { View, TextInput, StyleSheet, Text, Switch, Button, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';

const TextToSignScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
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
    <View style={[styles.container, { backgroundColor: darkMode ? '#2C3E50' : '#ECF0F1' }]}>
      <TextInput
        value={text}
        onChangeText={handleTextInputChange}
        placeholder="Enter Text"
        style={[styles.input, { backgroundColor: darkMode ? '#34495E' : '#fff', color: darkMode ? '#ECF0F1' : '#2C3E50' }]}
        placeholderTextColor={darkMode ? '#ECF0F1' : '#2C3E50'}
      />

      <Text style={[styles.label, { color: darkMode ? '#ECF0F1' : '#2C3E50' }]}>
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

      <View style={styles.switchContainer}>
        <Text style={[styles.label, { color: darkMode ? '#ECF0F1' : '#2C3E50' }]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Play" color="#3498DB" onPress={handlePlay} />
        <Button title="Stop" color="#E74C3C" onPress={handleStop} />
      </View>

      {aslGif && (
        <View style={styles.outputContainer}>
          <Image source={aslGif} style={styles.gif} />

          <Text style={[styles.outputText, { color: darkMode ? '#ECF0F1' : '#2C3E50' }]}>
            Entered Text: {text}
          </Text>

          <Text style={[styles.outputText, { color: darkMode ? '#ECF0F1' : '#2C3E50' }]}>
            Speed: {speed}
          </Text>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#3498DB',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '600',
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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
  },
  gif: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default TextToSignScreen;