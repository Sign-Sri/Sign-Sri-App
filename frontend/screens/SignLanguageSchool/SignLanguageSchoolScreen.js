import React,{useContext} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FontAwesome5 } from '@expo/vector-icons';
import { UserDetailContext } from '../../Context/UserDetailContext';






// Dummy data for lessons


const lessons = [
  {
    id: '1',
    title: 'Alphabet',
    level: 'Beginner',
    completed: true,
    videoUrl: 'https://example.com/alphabet-video', // Example video URL
    gif: require('../../assets/FirstPage/Alphabet.png'), // Path to Alphabet GIF
    icon: 'font', // FontAwesome5 icon name
  },
  {
    id: '2',
    title: 'Numbers',
    level: 'Beginner',
    completed: false,
    videoUrl: 'https://example.com/numbers-video', // Example video URL
    gif: require('../../assets/FirstPage/Numbers.png'), // Path to Numbers GIF
    icon: 'sort-numeric-up', // FontAwesome5 icon name
  },
  {
    id: '3',
    title: 'Phrases',
    level: 'Beginner',
    completed: false,
    videoUrl: 'https://example.com/phrases-video', // Example video URL
    gif: require('../../assets/FirstPage/Phrases.png'), // Path to Phrases GIF
    icon: 'comment-dots', // FontAwesome5 icon name
  },
  {
    id: '4',
    title: 'Shapes & Colors',
    level: 'Beginner',
    completed: false,
    videoUrl: 'https://example.com/phrases-video', // Example video URL
    gif: require('../../assets/FirstPage/Shapes & Colors.png'), // Path to Phrases GIF
    icon: 'shapes', // FontAwesome5 icon name
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
      <Text style={styles.header}>Welcome,{userDetail?.firstName}</Text>
      <FlatList
        data={lessons}
        renderItem={renderLesson}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display 2 items per row
        contentContainerStyle={styles.grid}
      />
      
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
  progressButton: {
    marginTop: verticalScale(20),
    padding: moderateScale(15),
    backgroundColor: '#73E000', // Green background for button
    borderRadius: moderateScale(50),
    alignItems: 'center',
  },
  progressButtonText: {
    color: '#FFFFFF', // White text for button
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default SignLanguageSchoolScreen;