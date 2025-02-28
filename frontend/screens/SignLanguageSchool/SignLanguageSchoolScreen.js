import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FontAwesome5 } from '@expo/vector-icons';

// Dummy data for lessons
const lessons = [
  {
    id: '1',
    title: 'Alphabet',
    level: 'Beginner',
    completed: true,
    videoUrl: 'https://example.com/alphabet-video', // Example video URL
    gif: require('../../assets/FirstPage/Alphabet.png'), // Path to Alphabet GIF
  },
  {
    id: '2',
    title: 'Numbers',
    level: 'Beginner',
    completed: false,
    videoUrl: 'https://example.com/numbers-video', // Example video URL
    gif: require('../../assets/FirstPage/Numbers.png'), // Path to Numbers GIF
  },
  {
    id: '3',
    title: 'Phrases',
    level: 'Beginner',
    completed: false,
    videoUrl: 'https://example.com/phrases-video', // Example video URL
    gif: require('../../assets/FirstPage/Phrases.png'), // Path to Phrases GIF
  },
  {
    id: '4',
    title: 'Shapes & Colors',
    level: 'Beginner',
    completed: false,
    videoUrl: 'https://example.com/phrases-video', // Example video URL
    gif: require('../../assets/FirstPage/Shapes & Colors.png'), // Path to Phrases GIF
  },
];

const LessonCard = ({ title, level, completed, gif, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image source={gif} style={styles.gif} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.level}>{level}</Text>
    {completed && <Text style={styles.completed}>✔️ Completed</Text>}
  </TouchableOpacity>
);

const SignLanguageSchoolScreen = ({ navigation }) => {
  const renderLesson = ({ item }) => (
    <LessonCard
      title={item.title}
      level={item.level}
      completed={item.completed}
      gif={item.gif}
      onPress={() => navigation.navigate('Lesson Screen', { lessonId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        renderItem={renderLesson}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.progressButton}
        onPress={() => navigation.navigate('Progress')}
      >
        <Text style={styles.progressButtonText}>View Progress</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: moderateScale(16),
    marginBottom: verticalScale(10),
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  gif: {
    width: scale(100),
    height: verticalScale(100),
    marginBottom: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#172937',
  },
  level: {
    fontSize: moderateScale(14),
    color: '#666',
  },
  completed: {
    fontSize: moderateScale(14),
    color: '#73E000',
    marginTop: verticalScale(5),
  },
  progressButton: {
    marginTop: verticalScale(20),
    padding: moderateScale(15),
    backgroundColor: '#73E000',
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  progressButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default SignLanguageSchoolScreen;