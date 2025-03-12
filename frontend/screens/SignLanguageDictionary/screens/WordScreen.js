import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Video } from "expo-av";
import data from "../assets/data.json";

const WordScreen = ({ route, navigation }) => {
  const { word } = route.params;
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  const videoSource = (() => {
    for (const letter in data) {
      const videoData = data[letter].find(item => item.word.toLowerCase() === word.toLowerCase());
      if (videoData && videoData.video) {
        return videoData.video;
      }
    }
    return null;
  })();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.word}>{word}</Text>
      {videoSource && (
        <Video
          ref={videoRef}
          source={{ uri: videoSource }}
          style={styles.videoContainer}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A369D",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  backButton: { position: "absolute", top: 40, left: 20 },
  backText: { fontSize: 30, color: "white" },
  word: { fontSize: 50, fontWeight: "bold", color: "white", marginBottom: 20 },
  videoContainer: { width: 300, height: 200 },
  scrollContainer: { alignItems: "center", paddingBottom: 20 },
  playButton: {
    marginTop: 20,
    backgroundColor: "#1F7A8C",
    padding: 10,
    borderRadius: 10,
  },
  playText: { color: "white", fontSize: 18 },
});

export default WordScreen;
