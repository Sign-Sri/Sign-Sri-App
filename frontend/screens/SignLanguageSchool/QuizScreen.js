import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ProgressBar from './components/ProgressBar'; // Ensure this path is correct

const questionsByLesson = {
  '1': [
    {
      letter: 'A',
      image: require('D:/SDGP/frontend/assets/Alphabet/signA.png'),
      question: 'What is the sign for "A"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signA.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signB.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signC.png'), isCorrect: false },
      ],
    },
    {
      letter: 'B',
      image: require('D:/SDGP/frontend/assets/Alphabet/signB.png'),
      question: 'What is the sign for "B"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signA.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signB.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signC.png'), isCorrect: false },
      ],
    },
    {
      letter: 'C',
      image: require('D:/SDGP/frontend/assets/Alphabet/signC.png'),
      question: 'What is the sign for "C"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signA.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signB.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signC.png'), isCorrect: true },
      ],
    },
    {
      letter: 'D',
      image: require('D:/SDGP/frontend/assets/Alphabet/signD.png'),
      question: 'What is the sign for "D"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signD.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signE.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signF.png'), isCorrect: false },
      ],
    },
    {
      letter: 'E',
      image: require('D:/SDGP/frontend/assets/Alphabet/signE.png'),
      question: 'What is the sign for "E"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signD.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signE.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signF.png'), isCorrect: false },
      ],
    },
    {
      letter: 'F',
      image: require('D:/SDGP/frontend/assets/Alphabet/signF.png'),
      question: 'What is the sign for "F"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signD.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signE.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signF.png'), isCorrect: true },
      ],
    },
    {
      letter: 'G',
      image: require('D:/SDGP/frontend/assets/Alphabet/signG.png'),
      question: 'What is the sign for "G"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signG.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signH.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signI.png'), isCorrect: false },
      ],
    },
    {
      letter: 'H',
      image: require('D:/SDGP/frontend/assets/Alphabet/signH.png'),
      question: 'What is the sign for "H"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signG.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signH.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signI.png'), isCorrect: false },
      ],
    },
    {
      letter: 'I',
      image: require('D:/SDGP/frontend/assets/Alphabet/signI.png'),
      question: 'What is the sign for "I"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signG.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signH.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signI.png'), isCorrect: true },
      ],
    },
    {
      letter: 'J',
      image: require('D:/SDGP/frontend/assets/Alphabet/signJ.png'),
      question: 'What is the sign for "J"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signJ.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signK.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signL.png'), isCorrect: false },
      ],
    },
    {
      letter: 'K',
      image: require('D:/SDGP/frontend/assets/Alphabet/signK.png'),
      question: 'What is the sign for "K"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signJ.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signK.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signL.png'), isCorrect: false },
      ],
    },
    {
      letter: 'L',
      image: require('D:/SDGP/frontend/assets/Alphabet/signL.png'),
      question: 'What is the sign for "L"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signJ.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signK.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signL.png'), isCorrect: true },
      ],
    },
    {
      letter: 'M',
      image: require('D:/SDGP/frontend/assets/Alphabet/signM.png'),
      question: 'What is the sign for "M"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signM.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signN.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signO.png'), isCorrect: false },
      ],
    },
    {
      letter: 'N',
      image: require('D:/SDGP/frontend/assets/Alphabet/signN.png'),
      question: 'What is the sign for "N"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signM.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signN.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signO.png'), isCorrect: false },
      ],
    },
    {
      letter: 'O',
      image: require('D:/SDGP/frontend/assets/Alphabet/signO.png'),
      question: 'What is the sign for "O"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signM.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signN.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signO.png'), isCorrect: true },
      ],
    },
    {
      letter: 'P',
      image: require('D:/SDGP/frontend/assets/Alphabet/signP.png'),
      question: 'What is the sign for "P"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signP.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signQ.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signR.png'), isCorrect: false },
      ],
    },
    {
      letter: 'Q',
      image: require('D:/SDGP/frontend/assets/Alphabet/signQ.png'),
      question: 'What is the sign for "Q"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signP.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signQ.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signR.png'), isCorrect: false },
      ],
    },
    {
      letter: 'R',
      image: require('D:/SDGP/frontend/assets/Alphabet/signR.png'),
      question: 'What is the sign for "R"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signP.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signQ.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signR.png'), isCorrect: true },
      ],
    },
    {
      letter: 'S',
      image: require('D:/SDGP/frontend/assets/Alphabet/signS.png'),
      question: 'What is the sign for "S"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signS.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signT.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signU.png'), isCorrect: false },
      ],
    },
    {
      letter: 'T',
      image: require('D:/SDGP/frontend/assets/Alphabet/signT.png'),
      question: 'What is the sign for "T"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signS.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signT.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signU.png'), isCorrect: false },
      ],
    },
    {
      letter: 'U',
      image: require('D:/SDGP/frontend/assets/Alphabet/signU.png'),
      question: 'What is the sign for "U"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signS.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signT.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signU.png'), isCorrect: true },
      ],
    },
    {
      letter: 'V',
      image: require('D:/SDGP/frontend/assets/Alphabet/signV.png'),
      question: 'What is the sign for "V"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signV.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signW.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signX.png'), isCorrect: false },
      ],
    },
    {
      letter: 'W',
      image: require('D:/SDGP/frontend/assets/Alphabet/signW.png'),
      question: 'What is the sign for "W"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signV.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signW.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signX.png'), isCorrect: false },
      ],
    },
    {
      letter: 'X',
      image: require('D:/SDGP/frontend/assets/Alphabet/signX.png'),
      question: 'What is the sign for "X"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signV.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signW.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signX.png'), isCorrect: true },
      ],
    },
    {
      letter: 'Y',
      image: require('D:/SDGP/frontend/assets/Alphabet/signY.png'),
      question: 'What is the sign for "Y"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signY.png'), isCorrect: true },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signZ.png'), isCorrect: false },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signA.png'), isCorrect: false },
      ],
    },
    {
      letter: 'Z',
      image: require('D:/SDGP/frontend/assets/Alphabet/signZ.png'),
      question: 'What is the sign for "Z"?',
      options: [
        { id: '1', image: require('D:/SDGP/frontend/assets/Alphabet/signY.png'), isCorrect: false },
        { id: '2', image: require('D:/SDGP/frontend/assets/Alphabet/signZ.png'), isCorrect: true },
        { id: '3', image: require('D:/SDGP/frontend/assets/Alphabet/signA.png'), isCorrect: false },
      ],
    },
  ],
  '2': [
    {
      number: '0',
      image: require('../../assets/Numbers/sign0.jpg'),
      question: 'What is the sign for "0"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign0.jpg'), isCorrect: true },
        { id: '2', image: require('../../assets/Numbers/sign2.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign1.jpg'), isCorrect: false },
      ],
    },
    {
      number: '1',
      image: require('../../assets/Numbers/sign1.jpg'),
      question: 'What is the sign for "1"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign2.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign3.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign1.jpg'), isCorrect: true },
      ],
    },
    {
      number: '2',
      image: require('../../assets/Numbers/sign2.jpg'),
      question: 'What is the sign for "2"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign4.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign2.jpg'), isCorrect: true },
        { id: '3', image: require('../../assets/Numbers/sign1.jpg'), isCorrect: false },
      ],
    },
    {
      number: '3',
      image: require('../../assets/Numbers/sign3.jpg'),
      question: 'What is the sign for "3"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign2.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign5.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign3.jpg'), isCorrect: true },
      ],
    },
    {
      number: '4',
      image: require('../../assets/Numbers/sign4.jpg'),
      question: 'What is the sign for "4"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign4.jpg'), isCorrect: true },
        { id: '2', image: require('../../assets/Numbers/sign6.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign3.jpg'), isCorrect: false },
      ],
    },
    {
      number: '5',
      image: require('../../assets/Numbers/sign5.jpg'),
      question: 'What is the sign for "5"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign4.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign7.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign5.jpg'), isCorrect: true },
      ],
    },
    {
      number: '6',
      image: require('../../assets/Numbers/sign6.jpg'),
      question: 'What is the sign for "6"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign8.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign6.jpg'), isCorrect: true },
        { id: '3', image: require('../../assets/Numbers/sign5.jpg'), isCorrect: false },
      ],
    },
    {
      number: '7',
      image: require('../../assets/Numbers/sign7.jpg'),
      question: 'What is the sign for "7"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign7.jpg'), isCorrect: true },
        { id: '2', image: require('../../assets/Numbers/sign9.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign6.jpg'), isCorrect: false },
      ],
    },
    {
      number: '8',
      image: require('../../assets/Numbers/sign8.jpg'),
      question: 'What is the sign for "8"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign7.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign0.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign8.jpg'), isCorrect: true },
      ],
    },
    {
      number: '9',
      image: require('../../assets/Numbers/sign9.jpg'),
      question: 'What is the sign for "9"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign1.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign9.jpg'), isCorrect: true },
        { id: '3', image: require('../../assets/Numbers/sign8.jpg'), isCorrect: false },
      ],
    },
  ],

  '3': [
    {
      phrase: 'Hello',
      image: require('../../assets/Phrases/signHello.jpg'),
      question: 'What is the sign for "Hello"?',
      options: [
        { id: '1', image: require('../../assets/Phrases/signHello.jpg'), isCorrect: true },
        { id: '2', image: require('../../assets/Phrases/signGoodbye.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Phrases/signThankYou.jpg'), isCorrect: false },
      ],
    },
    {
      phrase: 'Goodbye',
      image: require('../../assets/Phrases/signGoodbye.jpg'),
      question: 'What is the sign for "Goodbye"?',
      options: [
        { id: '1', image: require('../../assets/Phrases/signThankYou.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/Phrases/signHello.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Phrases/signGoodbye.jpg'), isCorrect: true },
      ],
    },
    {
      phrase: 'Thank You',
      image: require('../../assets/Phrases/signThankYou.jpg'),
      question: 'What is the sign for "Thank You"?',
      options: [
        { id: '1', image: require('../../assets/Phrases/signThankYou.jpg'), isCorrect: true },
        { id: '2', image: require('../../assets/Phrases/signHello.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Phrases/signGoodbye.jpg'), isCorrect: false },
      ],
    },
    {
      phrase: 'Yes',
      image: require('../../assets/Phrases/signYes.jpg'),
      question: 'What is the sign for "Yes"?',
      options: [
        { id: '1', image: require('../../assets/Phrases/signNo.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/Phrases/signYes.jpg'), isCorrect: true },
        { id: '3', image: require('../../assets/Phrases/signPlease.jpg'), isCorrect: false },
      ],
    },
    {
      phrase: 'No',
      image: require('../../assets/Phrases/signNo.jpg'),
      question: 'What is the sign for "No"?',
      options: [
        { id: '1', image: require('../../assets/Phrases/signNo.jpg'), isCorrect: true },
        { id: '2', image: require('../../assets/Phrases/signYes.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Phrases/signPlease.jpg'), isCorrect: false },
      ],
    },
    {
      phrase: 'Please',
      image: require('../../assets/Phrases/signPlease.jpg'),
      question: 'What is the sign for "Please"?',
      options: [
        { id: '1', image: require('../../assets/Phrases/signPlease.jpg'), isCorrect: true },
        { id: '2', image: require('../../assets/Phrases/signYes.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Phrases/signNo.jpg'), isCorrect: false },
      ],
    },
    // Add more phrases as needed
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
          <Text style={styles.introText}>
            This is the sign for "{questions[currentQuestion].phrase}":
          </Text>
          <View style={styles.imageContainer}>
            <Image source={questions[currentQuestion].image} style={styles.signImage} />
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={() => setShowIntroduction(false)}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.counter}>
            Question {currentQuestion + 1} of {questions.length}
          </Text>
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
  
  imageContainer: { 
    width: '100%', 
    alignItems: 'center', 
    marginBottom: 20 
  },

  signImage: { 
    width: '90%',  
    height: 250, 
    resizeMode: 'contain' 
  },

  nextButton: { backgroundColor: '#007bff', padding: 12, borderRadius: 8 },
  nextButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
  counter: { fontSize: 16, color: '#666', marginBottom: 10, textAlign: 'center' },
  question: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },

  optionsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    flexWrap: 'wrap', 
    gap: 10, 
    marginBottom: 20 
  },

  option: { 
    padding: 10, 
    backgroundColor: '#f0f0f0', 
    borderRadius: 8, 
    alignItems: 'center',
  },

  optionImage: { 
    width: 120, 
    height: 120, 
    resizeMode: 'contain' 
  },

  feedbackContainer: { 
    marginTop: 20, 
    padding: 10, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    alignItems: 'center' 
  },

  feedbackText: { fontSize: 18, fontWeight: 'bold' },
  tryAgainButton: { marginTop: 10, backgroundColor: 'red', padding: 10, borderRadius: 8 },
  tryAgainText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default QuizScreen;