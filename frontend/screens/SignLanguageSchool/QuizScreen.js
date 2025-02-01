import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProgressBar from './components/ProgressBar'; // Make sure this path is correct

const questions = [
  {
    question: 'What is the sign for "A"?',
    options: ['Option 1', 'Option 2', 'Option 3'],
    correctAnswer: 'Option 1',
  },
  {
    question: 'What is the sign for "B"?',
    options: ['Option 1', 'Option 2', 'Option 3'],
    correctAnswer: 'Option 2',
  },
  // Add more questions here
];

const QuizScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100; // Calculate progress

  const handleAnswer = (answer) => {
    const correct = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    }

    // Delay moving to the next question to show feedback
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigation.navigate('Progress', { score });
      }
    }, 1000); // 1-second delay
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Question Counter */}
      <Text style={styles.counter}>
        Question {currentQuestion + 1} of {questions.length}
      </Text>

      {/* Question */}
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>

      {/* Options */}
      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => handleAnswer(option)}
          disabled={showFeedback} // Disable options while showing feedback
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {/* Feedback */}
      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <Text
            style={[
              styles.feedbackText,
              { color: isCorrect ? 'green' : 'red' }, // Dynamically set color
            ]}
          >
            {isCorrect ? 'Correct! 🎉' : 'Incorrect! 😢'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  counter: { fontSize: 16, color: '#666', marginBottom: 10, textAlign: 'center' },
  question: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  option: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  optionText: { fontSize: 16 },
  feedbackContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizScreen;