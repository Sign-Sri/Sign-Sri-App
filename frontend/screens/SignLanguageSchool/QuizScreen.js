import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ProgressBar from './components/ProgressBar'; // Ensure this path is correct

const questions = [
  {
    letter: 'A',
    image: require('D:/SDGP/frontend/assets/signA.jpg'),
    question: 'What is the sign for "A"?',
    options: [
      { id: '1', image: require('D:/SDGP/frontend/assets/signA.jpg'), isCorrect: true },
      { id: '2', image: require('D:/SDGP/frontend/assets/signB.jpg'), isCorrect: false },
      { id: '3', image: require('D:/SDGP/frontend/assets/signC.jpg'), isCorrect: false },
    ],
  },
  {
    letter: 'B',
    image: require('D:/SDGP/frontend/assets/signB.jpg'),
    question: 'What is the sign for "B"?',
    options: [
      { id: '1', image: require('D:/SDGP/frontend/assets/signA.jpg'), isCorrect: false },
      { id: '2', image: require('D:/SDGP/frontend/assets/signB.jpg'), isCorrect: true },
      { id: '3', image: require('D:/SDGP/frontend/assets/signC.jpg'), isCorrect: false },
    ],
  },
  {
    letter: 'C',
    image: require('D:/SDGP/frontend/assets/signC.jpg'),
    question: 'What is the sign for "C"?',
    options: [
      { id: '1', image: require('D:/SDGP/frontend/assets/signA.jpg'), isCorrect: false },
      { id: '2', image: require('D:/SDGP/frontend/assets/signB.jpg'), isCorrect: false },
      { id: '3', image: require('D:/SDGP/frontend/assets/signC.jpg'), isCorrect: true },
    ],
  },
];

const QuizScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(true);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      // Correct answer
      setScore(score + 1);
      setIsCorrect(true);
      setShowFeedback(true);
      setShowTryAgain(false);
      
      // Proceed to the next question after a delay
      setTimeout(() => {
        setShowFeedback(false);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setShowIntroduction(true);
        } else {
          // Navigate to progress screen after last question
          navigation.navigate('Progress', { score, totalQuestions: questions.length });
        }
      }, 1000);
    } else {
      // Wrong answer
      setIsCorrect(false);
      setShowFeedback(true);
      setShowTryAgain(true); // Allow retry
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />
      {showIntroduction ? (
        <View style={styles.introContainer}>
          <Text style={styles.introText}>This is the sign for "{questions[currentQuestion].letter}":</Text>
          <Image source={questions[currentQuestion].image} style={styles.signImage} />
          <TouchableOpacity style={styles.nextButton} onPress={() => setShowIntroduction(false)}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.counter}>Question {currentQuestion + 1} of {questions.length}</Text>
          <Text style={styles.question}>{questions[currentQuestion].question}</Text>
          <View style={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.option}
                onPress={() => handleAnswer(option.isCorrect)}
                disabled={showFeedback} // Disable options after answer attempt
              >
                <Image source={option.image} style={styles.optionImage} />
              </TouchableOpacity>
            ))}
          </View>
          {showFeedback && (
            <View style={styles.feedbackContainer}>
              <Text style={[styles.feedbackText, { color: isCorrect ? 'green' : 'red' }]}> 
                {isCorrect ? 'Correct! 🎉' : 'Incorrect! 😢'}
              </Text>
              {showTryAgain && (
                <TouchableOpacity style={styles.tryAgainButton} onPress={() => setShowFeedback(false)}>
                  <Text style={styles.tryAgainText}>Try Again</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  introContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  introText: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  signImage: { width: 150, height: 150, marginBottom: 20 },
  nextButton: { backgroundColor: '#007bff', padding: 12, borderRadius: 8 },
  nextButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  counter: { fontSize: 16, color: '#666', marginBottom: 10, textAlign: 'center' },
  question: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  option: { padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
  optionImage: { width: 100, height: 100 },
  feedbackContainer: { marginTop: 20, padding: 10, backgroundColor: '#fff', borderRadius: 8, alignItems: 'center' },
  feedbackText: { fontSize: 18, fontWeight: 'bold' },
  tryAgainButton: { marginTop: 10, backgroundColor: 'red', padding: 10, borderRadius: 8 },
  tryAgainText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default QuizScreen;
