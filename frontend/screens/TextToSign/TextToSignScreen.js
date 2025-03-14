import { View, TextInput, StyleSheet, Text, Button, Image, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import React, { useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

//const API_URL = 'http://192.168.1.29:3000';

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

  const handlePlay = async () => {
    if (!text) {
      setError('Please enter the text');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://192.168.1.29:3000/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          speed: speed,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed');
      }

      const data = await response.json();

      if (!data.name) {
        throw new Error('Invalid response: GIF name is missing');
      }

      const gifUrl = `http://192.168.1.29:3000${data.name}`;
      setAslGif({ uri: gifUrl });
      setIsPlaying(true);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate ASL GIF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    setAslGif(null);
    setIsPlaying(false);
  };

  const handleViewAlphabet = () => {
    setShowAlphabetPanel(true);
  };

  const handleCloseAlphabetPanel = () => {
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
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

          <View style={styles.outputContainer}>
            {isLoading ? (
              <ActivityIndicator size='large' color='#0000ff' />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : isPlaying && aslGif ? (
              <>
                <ExpoImage
                  source={aslGif}
                  style={styles.gif}
                  contentFit="contain"
                />
                <Text style={styles.outputText}>
                  Entered Text: {text}
                </Text>
                <Text style={styles.outputText}>
                  Speed: {speed}
                </Text>
              </>
            ) : (
              <Text style={styles.instructionsText}>
                To view the ASL output:
                {"\n\n"}
                1. Enter text in the input field above.
                {"\n"}
                2. Select the desired speed (Slow, Normal, Fast).
                {"\n"}
                3. Press the "Play" button to generate the ASL output.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <Modal visible={showAlphabetPanel} transparent={true} animationType="slide" onRequestClose={handleCloseAlphabetPanel}>
        <View style={styles.modalContainer}>
          <View>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    padding: moderateScale(20),
  },
  input: {
    borderWidth: 1,
    padding: moderateScale(12),
    marginBottom: verticalScale(15),
    borderRadius: moderateScale(8),
    fontSize: moderateScale(16),
    borderColor: '#172937',
    backgroundColor: '#fff',
    color: '#2C3E50',
  },
  label: {
    fontSize: moderateScale(18),
    marginBottom: verticalScale(5),
    fontWeight: '600',
    color: '#2C3E50',
  },
  speedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  speedButton: {
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#172937',
    backgroundColor: '#172937',
    flex: 1,
    marginHorizontal: moderateScale(5),
    alignItems: 'center',
  },
  selectedSpeedButton: {
    backgroundColor: '#172937',
    borderColor: '#79dd09',
  },
  speedButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: moderateScale(14),
  },
  selectedSpeedButtonText: {
    color: '#79dd09',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },
  outputContainer: {
    marginTop: verticalScale(30),
    padding: moderateScale(20),
    backgroundColor: '#172937',
    borderRadius: moderateScale(10),
    alignItems: 'center',
    height: verticalScale(300),
    justifyContent: 'center',
  },
  outputText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginTop: verticalScale(10),
    color: '#ECF0F1',
  },
  gif: {
    width: moderateScale(200),
    height: moderateScale(200),
    marginBottom: verticalScale(10),
  },
  modalContainer: {
    flex: 1,
    padding: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: verticalScale(50),
    paddingBottom: verticalScale(50),
  },
  tile: {
    width: moderateScale(120),
    height: moderateScale(120),
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(5),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#172937',
    backgroundColor: '#fff',
  },
  tileImage: {
    width: moderateScale(110),
    height: moderateScale(110),
    resizeMode: 'contain',
  },
  instructionsText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#ECF0F1',
    textAlign: 'center',
    lineHeight: moderateScale(24),
  },
});

export default TextToSignScreen;