import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import data from "../assets/data.json";

const LetterScreen = ({ route, navigation }) => {
  const { letter } = route.params;
  const words = data[letter] || [];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.letter}>{letter}</Text>
      {words.map((item) => (
        <TouchableOpacity
          key={item.word}
          style={styles.wordButton}
          onPress={() => navigation.navigate("Word", { word: item.word, video: item.video })}
        >
          <Text style={styles.wordText}>{item.word}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A369D", alignItems: "center", paddingTop: 50 },
  backButton: { position: "absolute", top: 40, left: 20 },
  backText: { fontSize: 30, color: "white" },
  letter: { fontSize: 50, fontWeight: "bold", color: "white", marginBottom: 20 },
  wordButton: {
    backgroundColor: "#1F7A8C",
    padding: 15,
    marginVertical: 8,
    borderRadius: 20,
    width: 200,
    alignItems: "center",
  },
  wordText: { color: "white", fontSize: 20 },
});

export default LetterScreen;
