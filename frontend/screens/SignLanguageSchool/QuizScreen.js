import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ProgressBar from './components/ProgressBar'; // Ensure this path is correct

const questionsByLesson = {
  '1': [
    {
      letter: 'A',
      image: require('D:/SDGP/frontend/assets/signA.png'),
      question: 'What is the sign for "A"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signA.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/signB.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signC.png'), isCorrect: false },
      ],
    },
    {
      letter: 'B',
      image: require('D:/SDGP/frontend/assets/signB.png'),
      question: 'What is the sign for "B"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signA.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signB.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/signC.png'), isCorrect: false },
      ],
    },
    {
      letter: 'C',
      image: require('D:/SDGP/frontend/assets/signC.png'),
      question: 'What is the sign for "C"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signA.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signB.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signC.png'), isCorrect: true },
      ],
    },
    {
      letter: 'D',
      image: require('D:/SDGP/frontend/assets/signD.png'),
      question: 'What is the sign for "D"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signD.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/signE.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signF.png'), isCorrect: false },
      ],
    },
    {
      letter: 'E',
      image: require('D:/SDGP/frontend/assets/signE.png'),
      question: 'What is the sign for "E"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signD.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signE.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/signF.png'), isCorrect: false },
      ],
    },
    {
      letter: 'F',
      image: require('D:/SDGP/frontend/assets/signF.png'),
      question: 'What is the sign for "F"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signD.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signE.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signF.png'), isCorrect: true },
      ],
    },
    {
      letter: 'G',
      image: require('D:/SDGP/frontend/assets/signG.png'),
      question: 'What is the sign for "G"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signG.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/signH.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signI.png'), isCorrect: false },
      ],
    },
    {
      letter: 'H',
      image: require('D:/SDGP/frontend/assets/signH.png'),
      question: 'What is the sign for "H"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signG.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signH.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/signI.png'), isCorrect: false },
      ],
    },
    {
      letter: 'I',
      image: require('D:/SDGP/frontend/assets/signI.png'),
      question: 'What is the sign for "I"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signG.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signH.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signI.png'), isCorrect: true },
      ],
    },
    {
      letter: 'J',
      image: require('D:/SDGP/frontend/assets/signJ.png'),
      question: 'What is the sign for "J"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signJ.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/signK.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signL.png'), isCorrect: false },
      ],
    },
    {
      letter: 'K',
      image: require('D:/SDGP/frontend/assets/signK.png'),
      question: 'What is the sign for "K"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signJ.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signK.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/signL.png'), isCorrect: false },
      ],
    },
    {
      letter: 'L',
      image: require('D:/SDGP/frontend/assets/signL.png'),
      question: 'What is the sign for "L"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signJ.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signK.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signL.png'), isCorrect: true },
      ],
    },
    {
      letter: 'M',
      image: require('D:/SDGP/frontend/assets/signM.png'),
      question: 'What is the sign for "M"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signM.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/signN.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signO.png'), isCorrect: false },
      ],
    },
    {
      letter: 'N',
      image: require('D:/SDGP/frontend/assets/signN.png'),
      question: 'What is the sign for "N"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signM.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signN.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/signO.png'), isCorrect: false },
      ],
    },
    {
      letter: 'O',
      image: require('D:/SDGP/frontend/assets/signO.png'),
      question: 'What is the sign for "O"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signM.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signN.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signO.png'), isCorrect: true },
      ],
    },
    {
      letter: 'P',
      image: require('D:/SDGP/frontend/assets/signP.png'),
      question: 'What is the sign for "P"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signP.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/signQ.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signR.png'), isCorrect: false },
      ],
    },
    {
      letter: 'Q',
      image: require('D:/SDGP/frontend/assets/signQ.png'),
      question: 'What is the sign for "Q"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signP.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signQ.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/signR.png'), isCorrect: false },
      ],
    },
    {
      letter: 'R',
      image: require('D:/SDGP/frontend/assets/signR.png'),
      question: 'What is the sign for "R"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signP.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signQ.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signR.png'), isCorrect: true },
      ],
    },
    {
      letter: 'S',
      image: require('D:/SDGP/frontend/assets/signS.png'),
      question: 'What is the sign for "S"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signS.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/signT.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signU.png'), isCorrect: false },
      ],
    },
    {
      letter: 'T',
      image: require('D:/SDGP/frontend/assets/signT.png'),
      question: 'What is the sign for "T"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signS.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signT.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/signU.png'), isCorrect: false },
      ],
    },
    {
      letter: 'U',
      image: require('D:/SDGP/frontend/assets/signU.png'),
      question: 'What is the sign for "U"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signS.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signT.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signU.png'), isCorrect: true },
      ],
    },
    {
      letter: 'V',
      image: require('D:/SDGP/frontend/assets/signV.png'),
      question: 'What is the sign for "V"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signV.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/signW.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signX.png'), isCorrect: false },
      ],
    },
    {
      letter: 'W',
      image: require('D:/SDGP/frontend/assets/signW.png'),
      question: 'What is the sign for "W"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signV.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signW.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/signX.png'), isCorrect: false },
      ],
    },
    {
      letter: 'X',
      image: require('D:/SDGP/frontend/assets/signX.png'),
      question: 'What is the sign for "X"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signV.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signW.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signX.png'), isCorrect: true },
      ],
    },
    {
      letter: 'Y',
      image: require('D:/SDGP/frontend/assets/signY.png'),
      question: 'What is the sign for "Y"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signY.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/signZ.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/signA.png'), isCorrect: false },
      ],
    },
    {
      letter: 'Z',
      image: require('D:/SDGP/frontend/assets/signZ.png'),
      question: 'What is the sign for "Z"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/signY.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/signZ.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/signA.png'), isCorrect: false },
      ],
    },
  ],
  '2': [
    {
      number: '0',
      image: require('../../assets/sign0.jpg'),
      question: 'What is the sign for "0"?',
      options: [
        { id: '1', image: require('../../assets/sign0.jpg'), isCorrect: true },
        { id: '2', image: require('../../assets/sign2.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/sign1.jpg'), isCorrect: false },
      ],
    },
    {
      number: '1',
      image: require('../../assets/sign1.jpg'),
      question: 'What is the sign for "1"?',
      options: [
        { id: '1', image: require('../../assets/sign1.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/sign3.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/sign1.jpg'), isCorrect: true },
      ],
    },
    {
      number: '2',
      image: require('../../assets/sign2.jpg'),
      question: 'What is the sign for "2"?',
      options: [
        { id: '1', image: require('../../assets/sign4.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/sign2.jpg'), isCorrect: true },
        { id: '3', image: require('../../assets/sign1.jpg'), isCorrect: false },
      ],
    },
    {
      number: '3',
      image: require('../../assets/sign3.jpg'),
      question: 'What is the sign for "3"?',
      options: [
        { id: '1', image: require('../../assets/sign2.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/sign5.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/sign3.jpg'), isCorrect: true },
      ],
    },
    {
      number: '4',
      image: require('../../assets/sign4.jpg'),
      question: 'What is the sign for "4"?',
      options: [
        { id: '1', image: require('../../assets/sign4.jpg'), isCorrect: true },
        { id: '2', image: require('../../assets/sign6.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/sign3.jpg'), isCorrect: false },
      ],
    },
    {
      number: '5',
      image: require('../../assets/sign5.jpg'),
      question: 'What is the sign for "5"?',
      options: [
        { id: '1', image: require('../../assets/sign4.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/sign7.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/sign5.jpg'), isCorrect: true },
      ],
    },
    {
      number: '6',
      image: require('../../assets/sign6.jpg'),
      question: 'What is the sign for "6"?',
      options: [
        { id: '1', image: require('../../assets/sign8.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/sign6.jpg'), isCorrect: true },
        { id: '3', image: require('../../assets/sign5.jpg'), isCorrect: false },
      ],
    },
    {
      number: '7',
      image: require('../../assets/sign7.jpg'),
      question: 'What is the sign for "7"?',
      options: [
        { id: '1', image: require('../../assets/sign7.jpg'), isCorrect: true },
        { id: '2', image: require('../../assets/sign9.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/sign6.jpg'), isCorrect: false },
      ],
    },
    {
      number: '8',
      image: require('../../assets/sign8.jpg'),
      question: 'What is the sign for "8"?',
      options: [
        { id: '1', image: require('../../assets/sign7.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/sign0.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/sign8.jpg'), isCorrect: true },
      ],
    },
    {
      number: '9',
      image: require('../../assets/sign9.jpg'),
      question: 'What is the sign for "9"?',
      options: [
        { id: '1', image: require('../../assets/sign1.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/sign9.jpg'), isCorrect: true },
        { id: '3', image: require('../../assets/sign8.jpg'), isCorrect: false },
      ],
    },
  ],

  '3': [
    {
      phrase: 'Hello',
      image: require('../../assets/sign1.jpg'),
      question: 'What is the sign for "Hello"?',
      options: [
        { id: '1', image: require('../../assets/sign1.jpg'), isCorrect: true },
        { id: '2', image: require('../../assets/sign1.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/sign1.jpg'), isCorrect: false },
      ],
    },
    // Add more questions for Phrases
  ],
};

const QuizScreen = ({ navigation, route }) => {
  const { lessonId } = route.params;
  const questions = questionsByLesson[lessonId];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(true);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setIsCorrect(true);
      setShowFeedback(true);
      setShowTryAgain(false);

      setTimeout(() => {
        setShowFeedback(false);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setShowIntroduction(true);
        } else {
          navigation.navigate('Progress', { score, totalQuestions: questions.length });
        }
      }, 1000);
    } else {
      setIsCorrect(false);
      setShowFeedback(true);
      setShowTryAgain(true);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />
      {showIntroduction ? (
        <View style={styles.introContainer}>
          <Text style={styles.introText}>This is the sign for "{questions[currentQuestion].letter || questions[currentQuestion].number || questions[currentQuestion].phrase}":</Text>
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
                disabled={showFeedback}
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