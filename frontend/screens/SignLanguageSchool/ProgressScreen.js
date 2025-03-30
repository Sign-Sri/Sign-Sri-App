import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image'; // Import expo-image for GIF support
import ProgressBar from './components/ProgressBar';

const ProgressScreen = ({ route }) => {
  const navigation = useNavigation();
  const { score = 0, wrongAnswers = 0, totalQuestions = 1 } = route.params || {};
  const progress = 100;

  let yourScore;
  if (wrongAnswers === 0) {
    yourScore = 100;
  } else {
    yourScore = Math.min(Math.round((score / wrongAnswers) * 10), 100);
  }

  let badges = [];
  if (wrongAnswers <= 3) badges.push('Expert Badge');
  else if (wrongAnswers <= 6) badges.push('Intermediate Badge');
  else if (wrongAnswers <= 10) badges.push('Beginner Badge');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Add the GIF at the top */}
      <View style={styles.gifContainer}>
        <Image
          source={require('../../assets/Gif/celebration.gif')} // Path to your GIF
          style={styles.gif}
          contentFit="contain" // Ensure the GIF fits within the container
        />
      </View>

      <Text style={styles.title}>Your Progress Report</Text>

      <View style={styles.progressContainer}>
        <ProgressBar 
          progress={progress} 
          color="#73E000" 
          trackColor="#f0f0f0"
          height={verticalScale(12)}
        />
        <Text style={styles.progressText}>Lesson Completed!</Text>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreValue}>{yourScore}%</Text>
        <Text style={styles.scoreLabel}>Overall Score</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <FontAwesome5 
            name="check-circle" 
            size={moderateScale(28)} 
            color="#73E000" 
            style={styles.statIcon}
          />
          <Text style={styles.statNumber}>{score}</Text>
          <Text style={styles.statLabel}>Correct</Text>
        </View>

        <View style={styles.divider}/>

        <View style={styles.statCard}>
          <FontAwesome5 
            name="times-circle" 
            size={moderateScale(28)} 
            color="#FF5252" 
            style={styles.statIcon}
          />
          <Text style={styles.statNumber}>{wrongAnswers}</Text>
          <Text style={styles.statLabel}>Incorrect</Text>
        </View>
      </View>

      {badges.length > 0 && (
        <View style={styles.badgesContainer}>
          <Text style={styles.sectionTitle}>Achievements Unlocked</Text>
          <View style={styles.badgesGrid}>
            {badges.map((badge, index) => (
              <View key={index} style={styles.badgeCard}>
                <FontAwesome5 
                  name="medal" 
                  size={moderateScale(24)} 
                  color="#FFD700" 
                  style={styles.badgeIcon}
                />
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Continue Other Lessons Button */}
      <TouchableOpacity 
        style={styles.continueButton} 
        onPress={() => navigation.navigate('Sign Language School')}
      >
        <Text style={styles.continueButtonText}>Continue Other Lessons</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: moderateScale(20),
    paddingBottom: verticalScale(80), // Extra padding to avoid navigation bar
  },
  gifContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  gif: {
    width: scale(200), // Adjust the size of the GIF
    height: verticalScale(200), // Adjust the size of the GIF
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#172937',
    textAlign: 'center',
    marginVertical: verticalScale(10),
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    padding: moderateScale(15),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  progressText: {
    fontSize: moderateScale(14),
    color: '#666',
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(25),
  },
  scoreValue: {
    fontSize: moderateScale(48),
    fontWeight: '700',
    color: '#172937',
  },
  scoreLabel: {
    fontSize: moderateScale(16),
    color: '#666',
    marginTop: verticalScale(-5),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    marginBottom: verticalScale(8),
  },
  statNumber: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: '#172937',
  },
  statLabel: {
    fontSize: moderateScale(14),
    color: '#666',
  },
  divider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: moderateScale(10),
  },
  badgesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#172937',
    marginBottom: verticalScale(15),
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    marginVertical: verticalScale(5),
    width: '48%',
  },
  badgeIcon: {
    marginRight: moderateScale(8),
  },
  badgeText: {
    fontSize: moderateScale(14),
    color: '#172937',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default ProgressScreen;