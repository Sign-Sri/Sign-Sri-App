import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const LessonScreen = ({ route, navigation }) => {
  const { lessonId } = route.params;

  // Fetch lesson content based on lessonId
  const lessonContent = {
    id: '1',
    title: 'Alphabet',
    content: 'Learn the sign language alphabet...',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lessonContent.title}</Text>
      <Text style={styles.content}>{lessonContent.content}</Text>
      <Button
        title="Take Quiz"
        onPress={() => navigation.navigate('Quiz')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  content: { fontSize: 16, marginBottom: 20 },
});

export default LessonScreen;