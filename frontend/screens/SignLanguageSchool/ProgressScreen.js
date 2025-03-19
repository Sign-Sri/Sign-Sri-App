import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
  container: {
    flex: 1,
    padding: moderateScale(16),
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(16),
    color: '#172937',
  },
  progress: {
    fontSize: moderateScale(18),
    marginBottom: verticalScale(10),
    color: '#666',
  },
  score: {
    fontSize: moderateScale(18),
    marginBottom: verticalScale(10),
    color: '#666',
  },
  badges: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#73E000',
  },
});

export default ProgressScreen;