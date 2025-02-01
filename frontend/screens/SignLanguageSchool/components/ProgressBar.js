import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Badge from './components/Badge';

const ProgressScreen = ({ route }) => {
  const { score } = route.params || { score: 0 };
  const progress = 50; // Example progress
  const badges = [
    { name: 'Beginner Badge', iconName: 'star' },
    { name: 'Intermediate Badge', iconName: 'emoji-events' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <Text style={styles.progress}>Progress: {progress}%</Text>
      <Text style={styles.score}>Quiz Score: {score}</Text>
      <Text style={styles.subtitle}>Badges Earned:</Text>
      {badges.map((badge, index) => (
        <Badge key={index} name={badge.name} iconName={badge.iconName} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  progress: { fontSize: 18, marginBottom: 10 },
  score: { fontSize: 18, marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
});

export default ProgressScreen;