import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Dummy data for lessons
const lessons = [
  {
    id: '1',
    title: 'Alphabet',
    level: 'Beginner',
    completed: true,
    videoUrl: 'https://example.com/alphabet-video', // Example video URL
  },
  {
    id: '2',
    title: 'Numbers',
    level: 'Beginner',
    completed: false,
    videoUrl: 'https://example.com/numbers-video', // Example video URL
  },
  {
    id: '3',
    title: 'Greetings',
    level: 'Beginner',
    completed: false,
    videoUrl: 'https://example.com/greetings-video', // Example video URL
  },
];

const LessonCard = ({ title, level, completed, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
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
      onPress={() => navigation.navigate('Lesson', { lessonId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Language School</Text>
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