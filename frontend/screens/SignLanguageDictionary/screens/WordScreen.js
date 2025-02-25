import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Video from "react-native-video";
import { videoMapping } from "../VideoMappings";

const WordScreen = ({ route, navigation }) => {
  const { word } = route.params;


  const videoSource = videoMapping[word] || null;

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.word}>{word}</Text>

      {videoSource ? (
        <Video
          // source={require('../assets/videos/')}
          style={styles.videoContainer}
          controls
          resizeMode="contain"
        />
      ) : (
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoText}>No Video Available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A369D", alignItems: "center", justifyContent: "center", paddingTop: 50 },
  backButton: { position: "absolute", top: 40, left: 20 },
  backText: { fontSize: 30, color: "white" },
  word: { fontSize: 50, fontWeight: "bold", color: "white", marginBottom: 20 },
  videoContainer: { width: 300, height: 200 },
  videoPlaceholder: {
    backgroundColor: "#1F7A8C",
    width: 200,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  videoText: { color: "white", fontSize: 18 },
});

export default WordScreen;
