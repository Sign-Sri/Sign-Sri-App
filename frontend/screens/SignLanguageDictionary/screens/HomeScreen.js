import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learn</Text>
      <Text style={styles.subtitle}>Dictionary & Phrasebook</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
        >
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 30 },

  title: { fontSize: 32, fontWeight: "bold", color: "#0A369D" },

  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },

  scrollContainer: { alignItems: "center", paddingBottom: 20 },

  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", width: "90%" },

  button: {
    backgroundColor: "#172937",
    padding: 20,
    margin: 8,
    borderRadius: 10,
    width: "25%",
    alignItems: "center",
  },

  buttonText: { color: "#79dd09", fontSize: 20, fontWeight: "bold" },
});

export default HomeScreen;
