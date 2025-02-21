import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WordScreen({ route }) {
  const { word } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word: {word}</Text>
      <Text style={styles.description}>
        This is where the description of the word goes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
});
