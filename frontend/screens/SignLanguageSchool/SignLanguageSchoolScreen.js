import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

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
      onPress={() => navigation.navigate('Lesson', { lessonId: item.id })}
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
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  gif: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  level: { fontSize: 14, color: '#666' },
  completed: { fontSize: 14, color: 'green', marginTop: 5 },
  progressButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  progressButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default SignLanguageSchoolScreen;