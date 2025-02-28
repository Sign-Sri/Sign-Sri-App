import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const LessonScreen = ({ route, navigation }) => {
  const { lessonId } = route.params;

  const lessonContent = {
    '1': {
      id: '1',
      title: 'Alphabet',
      content: 'Learn the sign language alphabet...',
    },
    '2': {
      id: '2',
      title: 'Numbers',
      content: 'Learn the sign language numbers...',
    },
    '3': {
      id: '3',
      title: 'Phrases',
      content: 'Learn common sign language phrases...',
    },
    '4': {
      id: '4',
      title: 'Shapes & Colors',
      content: 'Learn the sign language for shapes and colors...',
    },
  }[lessonId];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lessonContent.title}</Text>
      <Text style={styles.content}>{lessonContent.content}</Text>
      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => navigation.navigate('Quiz', { lessonId })}
      >
        <Text style={styles.quizButtonText}>Take Quiz</Text>
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
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(16),
    color: '#172937',
  },
  content: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(20),
    color: '#666',
  },
  quizButton: {
    backgroundColor: '#73E000',
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  quizButtonText: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
});

export default LessonScreen;