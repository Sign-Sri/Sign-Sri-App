
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

export default function SignToTextScreen() { 
  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState('front');
  const [isCapturing, setIsCapturing] = useState(false);
  const [currentLetter, setCurrentLetter] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [sentence, setSentence] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [letterCounts, setLetterCounts] = useState({});
  const [blankCount, setBlankCount] = useState(0);
  
  const cameraRef = useRef(null);
  const captureInterval = useRef(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }

    return () => {
      if (captureInterval.current) {
        clearInterval(captureInterval.current);
      }
    };
  }, [permission]);

  useEffect(() => {
    if (currentWord.trim().length > 0) {
      fetchSuggestions(currentWord);
    } else {
      setSuggestions([]);
    }
  }, [currentWord]);

  const fetchSuggestions = async (word) => {
    try {
      const response = await fetch(`${API_URL}/api/suggestions?word=${word}`);
      const data = await response.json();
      
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const startCapturing = () => {
    setIsCapturing(true);
    
    captureInterval.current = setInterval(async () => {
      if (cameraRef.current) {
        try {
          const photo = await cameraRef.current.takePictureAsync({
            quality: 0.5,
          });
          
          const processedImage = await ImageManipulator.manipulateAsync(
            photo.uri,
            [
              { resize: { width: 300, height: 300 } },
              { crop: { originX: 75, originY: 75, width: 150, height: 150 } }
            ],
            { format: 'jpeg' }
          );
          
          const formData = new FormData();
          formData.append('image', {
            uri: processedImage.uri,
            type: 'image/jpeg',
            name: 'sign_image.jpg',
          });
          
          const response = await fetch(`${API_URL}/api/predict`, {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
          const result = await response.json();
          
          if (result.letter) {
            processLetter(result.letter);
          }
        } catch (error) {
          console.error('Error capturing and processing image:', error);
        }
      }
    }, 200);
  };

  const stopCapturing = () => {
    setIsCapturing(false);
    if (captureInterval.current) {
      clearInterval(captureInterval.current);
    }
  };

  const processLetter = (letter) => {
    setCurrentLetter(letter);
    
    if (letter === 'blank') {
      setLetterCounts({});
      setBlankCount(prev => prev + 1);
      
      if (blankCount > 20 && currentWord.length > 0) {
        setSentence(prev => prev + (prev.length > 0 ? ' ' : '') + currentWord);
        setCurrentWord('');
        setBlankCount(0);
      }
    } else {
      setBlankCount(0);
      
      setLetterCounts(prev => {
        const newCounts = { ...prev };
        newCounts[letter] = (newCounts[letter] || 0) + 1;
        
        if (newCounts[letter] > 30) {
          let shouldAdd = true;
          Object.entries(newCounts).forEach(([key, count]) => {
            if (key !== letter && Math.abs(count - newCounts[letter]) <= 10) {
              shouldAdd = false;
            }
          });
          
          if (shouldAdd) {
            setCurrentWord(prev => prev + letter);
            return {};
          }
        }
        
        return newCounts;
      });
    }
  };

  const selectSuggestion = (suggestion) => {
    setSentence(prev => prev + (prev.length > 0 ? ' ' : '') + suggestion);
    setCurrentWord('');
    setSuggestions([]);
  };

  const clearAll = () => {
    setCurrentWord('');
    setSentence('');
    setSuggestions([]);
    setLetterCounts({});
    setBlankCount(0);
  };

  if (!permission) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }
  
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={type}
        >
          <View style={styles.overlay}>
            <View style={styles.captureArea} />
          </View>
        </CameraView>
      </View>
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.button, isCapturing ? styles.activeButton : null]}
          onPress={isCapturing ? stopCapturing : startCapturing}
        >
          <Text style={styles.buttonText}>
            {isCapturing ? 'Stop Capturing' : 'Start Capturing'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.textContainer}>
        <Text>Current Letter: {currentLetter}</Text>
        <Text>Current Word: {currentWord}</Text>
        <ScrollView horizontal>
          <Text>Sentence: {sentence}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  cameraContainer: { height: '50%', width: '100%' },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  captureArea: { width: 200, height: 200, borderWidth: 2, borderColor: '#fff' },
  controlsContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 20 },
  button: { backgroundColor: '#2196F3', padding: 15, borderRadius: 50, alignItems: 'center', width: '45%' },
  activeButton: { backgroundColor: '#FF5722' },
  clearButton: { backgroundColor: '#757575', padding: 15, borderRadius: 50, alignItems: 'center', width: '45%' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  textContainer: { padding: 20 }
});
