import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learn</Text>
      <Text style={styles.subtitle}>Dictionary & Phrasebook</Text>
      <View style={styles.grid}>
        {letters.map((letter) => (
          <TouchableOpacity
            key={letter}
            style={styles.button}
            onPress={() => navigation.navigate("Letter", { letter })}
          >
            <Text style={styles.buttonText}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 50 },
  title: { fontSize: 32, fontWeight: "bold", color: "#0A369D" },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  button: {
    backgroundColor: "#0A369D",
    padding: 20,
    margin: 8,
    borderRadius: 10,
    width: 60,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 20, fontWeight: "bold" },
});

export default HomeScreen;
