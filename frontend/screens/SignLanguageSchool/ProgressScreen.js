import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FontAwesome5 } from '@expo/vector-icons'; // For icons
import ProgressBar from './components/ProgressBar'; // Assuming you have a ProgressBar component

const ProgressScreen = ({ route }) => {
  const { score = 0, wrongAnswers = 0, totalQuestions = 1 } = route.params || {};
  const progress = 100; // Always show 100% completion

  // Calculate Your Score based on the formula: (correctAnswers / wrongAnswers) * 10%
  let yourScore;
  if (wrongAnswers === 0) {
    yourScore = 100; // If no wrong answers, score is 100%
  } else {
    yourScore = Math.min(Math.round((score / wrongAnswers) * 10), 100); // Cap score at 100%
  }

  let badges = [];
  if (wrongAnswers >= 0 && wrongAnswers <= 3) {
    badges.push('Expert Badge');
  } else if (wrongAnswers >= 4 && wrongAnswers <= 6) {
    badges.push('Intermediate Badge');
  } else if (wrongAnswers >= 7 && wrongAnswers <= 10) {
    badges.push('Beginner Badge');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <ProgressBar progress={progress} />
        {/* Removed the duplicate "100% Completed" text here */}
      </View>

      {/* Your Score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Your Score: {yourScore}%</Text>
      </View>

      {/* Correct and Wrong Answers */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <FontAwesome5 name="check-circle" size={moderateScale(24)} color="#73E000" />
          <Text style={styles.statText}>Correct Answers: {score}</Text>
        </View>
        <View style={styles.statItem}>
          <FontAwesome5 name="times-circle" size={moderateScale(24)} color="#FF0000" />
          <Text style={styles.statText}>Wrong Answers: {wrongAnswers}</Text>
        </View>
      </View>

      {/* Badges */}
      <View style={styles.badgesContainer}>
        <Text style={styles.badgesTitle}>Badges Earned</Text>
        <View style={styles.badgesList}>
          {badges.map((badge, index) => (
            <View key={index} style={styles.badgeItem}>
              <FontAwesome5 name="medal" size={moderateScale(20)} color="#FFD700" />
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ))}
        </View>
      </View>
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
    marginBottom: verticalScale(20),
    color: '#172937',
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  scoreContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  scoreText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#172937',
  },
  statsContainer: {
    width: '100%',
    marginBottom: verticalScale(20),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  statText: {
    fontSize: moderateScale(16),
    color: '#666',
    marginLeft: moderateScale(10),
  },
  badgesContainer: {
    width: '100%',
    alignItems: 'center',
  },
  badgesTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#172937',
    marginBottom: verticalScale(10),
  },
  badgesList: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    margin: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  badgeText: {
    fontSize: moderateScale(14),
    color: '#172937',
    marginLeft: moderateScale(5),
  },
});

export default ProgressScreen;