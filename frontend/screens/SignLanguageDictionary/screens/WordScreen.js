import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { videoData } from "../assets/data";

const WordScreen = ({ route, navigation }) => {
  const { word } = route.params;
  const videoRef = useRef(null);
  const [videoSource, setVideoSource] = useState(null);
  const [videoRate, setVideoRate] = useState(1);

  useEffect(() => {
    let foundVideo = null;

    for (const letter in videoData) {
      const videoEntry = videoData[letter].find(
        (item) => item.word.toLowerCase() === word.toLowerCase()
      );

      if (videoEntry && videoEntry.video) {
        foundVideo = videoEntry.video;
        break;
      }
    }

    setVideoSource(foundVideo);
  }, [word]);

  // Slows down the video for easy viewing for the user
  const slowDownVideo = () => {
    setVideoRate((prevRate) => Math.max(prevRate - 0.25, 0.05));
  };

  const speedUp = () => {
    setVideoRate(1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.word}>{word}</Text>

      {videoSource && (
        <Video
          ref={videoRef}
          source={videoSource}
          style={styles.videoContainer}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay
          rate={videoRate}
        />
      )}

      {/* Slow button */}
      <TouchableOpacity style={styles.slowButton} onPress={slowDownVideo}>
        <Text style={styles.buttonText}>Slow Down</Text>
      </TouchableOpacity>

      {/* Normal Speed Button */}
      <TouchableOpacity style = {styles.fastButton} onPress={speedUp}>
        <Text style = {styles.buttonText}>Normal Speed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },

  backButton: { position: "absolute", top: 40, left: 20 },

  backText: { fontSize: 30, color: "white" },

  word: { fontSize: 50, fontWeight: "bold", color: "#172937", marginBottom: 20 },

  videoContainer: { width: 400, height: 300 },

  slowButton: {
    marginTop: 20,
    backgroundColor: "#79dd09",
    padding: 10,
    borderRadius: 50,
  },
  
  fastButton: {
    marginTop: 40,
    backgroundColor: "#79dd09",
    padding: 10,
    borderRadius: 50,
  },

  buttonText: { color: "black", fontSize: 18, fontWeight: "bold" },
});

export default WordScreen;
