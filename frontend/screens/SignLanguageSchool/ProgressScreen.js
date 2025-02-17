import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressScreen = ({ route }) => {
  const { score = 0, totalQuestions = 1 } = route.params || {};
  const progress = Math.round((score / totalQuestions) * 100);
  const wrongAnswers = totalQuestions - score;

  let badges = [];
  if (score === totalQuestions) {
    badges.push('Expert Badge');
  } else if (score >= totalQuestions / 2) {
    badges.push('Intermediate Badge');
  } else {
    badges.push('Beginner Badge');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <Text style={styles.progress}>Progress: {progress}%</Text>
      <Text style={styles.score}>Correct Answers: {score}</Text>
      <Text style={styles.score}>Wrong Answers: {wrongAnswers}</Text>
      <Text style={styles.badges}>Badges: {badges.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  progress: { fontSize: 18, marginBottom: 10 },
  score: { fontSize: 18, marginBottom: 10 },
  badges: { fontSize: 18, fontWeight: 'bold', color: 'blue' },
});

export default ProgressScreen;
