import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressScreen = ({ route }) => {
  const { score } = route.params || { score: 0 };
  const progress = 50; // Example progress
  const badges = ['Beginner Badge', 'Intermediate Badge'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <Text style={styles.progress}>Progress: {progress}%</Text>
      <Text style={styles.score}>Quiz Score: {score}</Text>
      <Text style={styles.badges}>Badges: {badges.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  progress: { fontSize: 18, marginBottom: 10 },
  score: { fontSize: 18, marginBottom: 10 },
  badges: { fontSize: 18 },
});

export default ProgressScreen;