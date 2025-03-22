import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Image } from 'expo-image'; // Import expo-image for GIF support

const LessonScreen = ({ route, navigation }) => {
  const { lessonId } = route.params;

  const lessonContent = {
    '1': {
      id: '1',
      title: 'Alphabet',
      content: 'Learn the sign language alphabet...',
      gif: require('../../assets/Gif/Alphabet.gif'), // Add GIF for Alphabet
    },
    '2': {
      id: '2',
      title: 'Numbers',
      content: 'Learn the sign language numbers...',
      gif: require('../../assets/Gif/Numbers.gif'), // Add GIF for Numbers
    },
    '3': {
      id: '3',
      title: 'Phrases',
      content: 'Learn common sign language phrases...',
      gif: require('../../assets/Gif/Phrases.gif'), // Add GIF for Phrases
    },
    '4': {
      id: '4',
      title: 'Shapes & Colors',
      content: 'Learn the sign language for shapes and colors...',
      gif: require('../../assets/Gif/ShapesColors.gif'), // Add GIF for Shapes & Colors
    },
  }[lessonId];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lessonContent.title}</Text>
      <Text style={styles.content}>{lessonContent.content}</Text>

      {/* Display the GIF */}
      <View style={styles.gifContainer}>
        <Image
          source={lessonContent.gif}
          style={styles.gif}
          contentFit="contain" // Ensure the GIF fits within the container
        />
      </View>

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
  gifContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  gif: {
    width: scale(200), // Adjust the size of the GIF
    height: verticalScale(300), // Adjust the size of the GIF
  },
  quizButton: {
    backgroundColor: '#182a38',
    padding: moderateScale(12),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    //
  },
  quizButtonText: {
    color: '#ffffff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
});

export default LessonScreen;