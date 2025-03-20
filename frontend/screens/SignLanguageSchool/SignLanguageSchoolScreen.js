import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'expo-image'; // Use expo-image for animated GIFs
import { UserDetailContext } from '../../Context/UserDetailContext';

// Import the GIF
const happyStarGif = require('../../assets/Gif/happy_star.gif'); // Adjust the path to your GIF

// Dummy data for lessons
const lessons = [
  {
    id: '1',
    title: 'Alphabet',
    level: 'Beginner',
    completed: true,
    videoUrl: 'https://example.com/alphabet-video',
    gif: require('../../assets/FirstPage/Alphabet.png'),
    icon: 'font',
  },
  {
    id: '2',
    title: 'Numbers',
    level: 'Beginner',
    completed: false,
    videoUrl: 'https://example.com/numbers-video',
    gif: require('../../assets/FirstPage/Numbers.png'),
    icon: 'sort-numeric-up',
  },
  {
    id: '3',
    title: 'Phrases',
    level: 'Beginner',
    completed: false,
    videoUrl: 'https://example.com/phrases-video',
    gif: require('../../assets/FirstPage/Phrases.png'),
    icon: 'comment-dots',
  },
  {
    id: '4',
    title: 'Shapes & Colors',
    level: 'Beginner',
    completed: false,
    videoUrl: 'https://example.com/phrases-video',
    gif: require('../../assets/FirstPage/Shapes & Colors.png'),
    icon: 'shapes',
  },
];

const LessonCard = ({ title, level, completed, gif, icon, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <FontAwesome5 name={icon} size={moderateScale(30)} color="#73E000" />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.level}>{level}</Text>
    {completed && <Text style={styles.completed}>✔️ Completed</Text>}
  </TouchableOpacity>
);

const SignLanguageSchoolScreen = ({ navigation }) => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const renderLesson = ({ item }) => (
    <LessonCard
      title={item.title}
      level={item.level}
      completed={item.completed}
      gif={item.gif}
      icon={item.icon}
      onPress={() => navigation.navigate('Lesson Screen', { lessonId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {userDetail?.firstName}</Text>
      <FlatList
        data={lessons}
        renderItem={renderLesson}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display 2 items per row
        contentContainerStyle={styles.grid}
      />

      {/* Add the happy star GIF at the bottom */}
      <View style={styles.gifContainer}>
        <Image
          source={happyStarGif}
          style={styles.gif}
          contentFit="contain" // Ensures the GIF fits within the container
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
    backgroundColor: '#FFFFFF', // White background
  },
  header: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
    color: '#172937', // Dark blue text
    textAlign: 'center',
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: verticalScale(120), // Add padding to avoid overlap with the GIF
  },
  card: {
    width: scale(140),
    height: verticalScale(140),
    backgroundColor: '#172937', // Dark blue background for cards
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10),
    margin: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    marginTop: verticalScale(8),
    color: '#FFFFFF', // White text for card titles
    letterSpacing: moderateScale(0.5),
  },
  level: {
    fontSize: moderateScale(14),
    color: '#B0B0B0', // Light gray text for level
  },
  completed: {
    fontSize: moderateScale(14),
    color: '#73E000', // Green text for completed status
    marginTop: verticalScale(5),
  },
  gifContainer: {
    position: 'absolute',
    bottom: verticalScale(-70), // Position the GIF at the bottom
    alignSelf: 'center',
  },
  gif: {
    width: scale(400), // Make the GIF larger
    height: verticalScale(300), // Make the GIF larger
  },
});

export default SignLanguageSchoolScreen;