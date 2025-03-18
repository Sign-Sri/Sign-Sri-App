import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FontAwesome5 } from '@expo/vector-icons';
import ProgressBar from './components/ProgressBar';

const questionsByLesson = {
  '1': [
    {
      letter: 'A',
      image: require('../../assets/Alphabet/signA.png'),
      question: 'What is the sign for "A"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signA.png'), isCorrect: true },
        { id: '2', image: require('../../assets/Alphabet/signB.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signC.png'), isCorrect: false },
      ],
    },
    {
      letter: 'B',
      image: require('../../assets/Alphabet/signB.png'),
      question: 'What is the sign for "B"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signA.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signB.png'), isCorrect: true },
        { id: '3', image: require('../../assets/Alphabet/signC.png'), isCorrect: false },
      ],
    },
    {
      letter: 'C',
      image: require('../../assets/Alphabet/signC.png'),
      question: 'What is the sign for "C"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signA.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signB.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signC.png'), isCorrect: true },
      ],
    },
    {
      letter: 'D',
      image: require('../../assets/Alphabet/signD.png'),
      question: 'What is the sign for "D"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signD.png'), isCorrect: true },
        { id: '2', image: require('../../assets/Alphabet/signE.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signF.png'), isCorrect: false },
      ],
    },
    {
      letter: 'E',
      image: require('../../assets/Alphabet/signE.png'),
      question: 'What is the sign for "E"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signD.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signE.png'), isCorrect: true },
        { id: '3', image: require('../../assets/Alphabet/signF.png'), isCorrect: false },
      ],
    },
    {
      letter: 'F',
      image: require('../../assets/Alphabet/signF.png'),
      question: 'What is the sign for "F"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signD.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signE.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signF.png'), isCorrect: true },
      ],
    },
    {
      letter: 'G',
      image: require('../../assets/Alphabet/signG.png'),
      question: 'What is the sign for "G"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signG.png'), isCorrect: true },
        { id: '2', image: require('../../assets/Alphabet/signH.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signI.png'), isCorrect: false },
      ],
    },
    {
      letter: 'H',
      image: require('../../assets/Alphabet/signH.png'),
      question: 'What is the sign for "H"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signG.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signH.png'), isCorrect: true },
        { id: '3', image: require('../../assets/Alphabet/signI.png'), isCorrect: false },
      ],
    },
    {
      letter: 'I',
      image: require('../../assets/Alphabet/signI.png'),
      question: 'What is the sign for "I"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signG.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signH.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signI.png'), isCorrect: true },
      ],
    },
    {
      letter: 'J',
      image: require('../../assets/Alphabet/signJ.png'),
      question: 'What is the sign for "J"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signJ.png'), isCorrect: true },
        { id: '2', image: require('../../assets/Alphabet/signK.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signL.png'), isCorrect: false },
      ],
    },
    {
      letter: 'K',
      image: require('../../assets/Alphabet/signK.png'),
      question: 'What is the sign for "K"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signJ.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signK.png'), isCorrect: true },
        { id: '3', image: require('../../assets/Alphabet/signL.png'), isCorrect: false },
      ],
    },
    {
      letter: 'L',
      image: require('../../assets/Alphabet/signL.png'),
      question: 'What is the sign for "L"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signJ.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signK.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signL.png'), isCorrect: true },
      ],
    },
    {
      letter: 'M',
      image: require('../../assets/Alphabet/signM.png'),
      question: 'What is the sign for "M"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signM.png'), isCorrect: true },
        { id: '2', image: require('../../assets/Alphabet/signN.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signO.png'), isCorrect: false },
      ],
    },
    {
      letter: 'N',
      image: require('../../assets/Alphabet/signN.png'),
      question: 'What is the sign for "N"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signM.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signN.png'), isCorrect: true },
        { id: '3', image: require('../../assets/Alphabet/signO.png'), isCorrect: false },
      ],
    },
    {
      letter: 'O',
      image: require('../../assets/Alphabet/signO.png'),
      question: 'What is the sign for "O"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signM.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signN.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signO.png'), isCorrect: true },
      ],
    },
    {
      letter: 'P',
      image: require('../../assets/Alphabet/signP.png'),
      question: 'What is the sign for "P"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signP.png'), isCorrect: true },
        { id: '2', image: require('../../assets/Alphabet/signQ.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signR.png'), isCorrect: false },
      ],
    },
    {
      letter: 'Q',
      image: require('../../assets/Alphabet/signQ.png'),
      question: 'What is the sign for "Q"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signP.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signQ.png'), isCorrect: true },
        { id: '3', image: require('../../assets/Alphabet/signR.png'), isCorrect: false },
      ],
    },
    {
      letter: 'R',
      image: require('../../assets/Alphabet/signR.png'),
      question: 'What is the sign for "R"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signP.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signQ.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signR.png'), isCorrect: true },
      ],
    },
    {
      letter: 'S',
      image: require('../../assets/Alphabet/signS.png'),
      question: 'What is the sign for "S"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signS.png'), isCorrect: true },
        { id: '2', image: require('../../assets/Alphabet/signT.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signU.png'), isCorrect: false },
      ],
    },
    {
      letter: 'T',
      image: require('../../assets/Alphabet/signT.png'),
      question: 'What is the sign for "T"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signS.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signT.png'), isCorrect: true },
        { id: '3', image: require('../../assets/Alphabet/signU.png'), isCorrect: false },
      ],
    },
    {
      letter: 'U',
      image: require('../../assets/Alphabet/signU.png'),
      question: 'What is the sign for "U"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signS.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signT.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signU.png'), isCorrect: true },
      ],
    },
    {
      letter: 'V',
      image: require('../../assets/Alphabet/signV.png'),
      question: 'What is the sign for "V"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signV.png'), isCorrect: true },
        { id: '2', image: require('../../assets/Alphabet/signW.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signX.png'), isCorrect: false },
      ],
    },
    {
      letter: 'W',
      image: require('../../assets/Alphabet/signW.png'),
      question: 'What is the sign for "W"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signV.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signW.png'), isCorrect: true },
        { id: '3', image: require('../../assets/Alphabet/signX.png'), isCorrect: false },
      ],
    },
    {
      letter: 'X',
      image: require('../../assets/Alphabet/signX.png'),
      question: 'What is the sign for "X"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signV.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signW.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signX.png'), isCorrect: true },
      ],
    },
    {
      letter: 'Y',
      image: require('../../assets/Alphabet/signY.png'),
      question: 'What is the sign for "Y"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signY.png'), isCorrect: true },
        { id: '2', image: require('../../assets/Alphabet/signZ.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Alphabet/signA.png'), isCorrect: false },
      ],
    },
    {
      letter: 'Z',
      image: require('../../assets/Alphabet/signZ.png'),
      question: 'What is the sign for "Z"?',
      options: [
        { id: '1', image: require('../../assets/Alphabet/signY.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Alphabet/signZ.png'), isCorrect: true },
        { id: '3', image: require('../../assets/Alphabet/signA.png'), isCorrect: false },
      ],
    },
  ],
  '2': [
    {
      number: '0',
      image: require('../../assets/Numbers/sign0.png'),
      question: 'What is the sign for "0"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign0.png'), isCorrect: true },
        { id: '2', image: require('../../assets/Numbers/sign2.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign1.png'), isCorrect: false },
      ],
    },
    {
      number: '1',
      image: require('../../assets/Numbers/sign1.png'),
      question: 'What is the sign for "1"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign2.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign3.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign1.png'), isCorrect: true },
      ],
    },
    {
      number: '2',
      image: require('../../assets/Numbers/sign2.png'),
      question: 'What is the sign for "2"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign4.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign2.png'), isCorrect: true },
        { id: '3', image: require('../../assets/Numbers/sign1.png'), isCorrect: false },
      ],
    },
    {
      number: '3',
      image: require('../../assets/Numbers/sign3.png'),
      question: 'What is the sign for "3"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign2.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign5.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign3.png'), isCorrect: true },
      ],
    },
    {
      number: '4',
      image: require('../../assets/Numbers/sign4.png'),
      question: 'What is the sign for "4"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign4.png'), isCorrect: true },
        { id: '2', image: require('../../assets/Numbers/sign6.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign3.png'), isCorrect: false },
      ],
    },
    {
      number: '5',
      image: require('../../assets/Numbers/sign5.png'),
      question: 'What is the sign for "5"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign4.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign7.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign5.png'), isCorrect: true },
      ],
    },
    {
      number: '6',
      image: require('../../assets/Numbers/sign6.png'),
      question: 'What is the sign for "6"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign8.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign6.png'), isCorrect: true },
        { id: '3', image: require('../../assets/Numbers/sign5.png'), isCorrect: false },
      ],
    },
    {
      number: '7',
      image: require('../../assets/Numbers/sign7.png'),
      question: 'What is the sign for "7"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign7.png'), isCorrect: true },
        { id: '2', image: require('../../assets/Numbers/sign9.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign6.png'), isCorrect: false },
      ],
    },
    {
      number: '8',
      image: require('../../assets/Numbers/sign8.png'),
      question: 'What is the sign for "8"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign7.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign0.png'), isCorrect: false },
        { id: '3', image: require('../../assets/Numbers/sign8.png'), isCorrect: true },
      ],
    },
    {
      number: '9',
      image: require('../../assets/Numbers/sign9.png'),
      question: 'What is the sign for "9"?',
      options: [
        { id: '1', image: require('../../assets/Numbers/sign1.png'), isCorrect: false },
        { id: '2', image: require('../../assets/Numbers/sign9.png'), isCorrect: true },
        { id: '3', image: require('../../assets/Numbers/sign8.png'), isCorrect: false },
      ],
    },
  ],

  '4': [
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
  '4': [ // New lesson: Shapes & Colors
    {
      shape: 'Circle',
      image: require('../../assets/Shapes & Colors/signCircle.jpg'),
      question: 'What is the sign for "Circle"?',
      options: [
        { id: '1', image: require('../../assets/Shapes & Colors/signCircle.jpg'), isCorrect: true },
        { id: '2', image: require('../../assets/Shapes & Colors/signSquare.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Shapes & Colors/signTriangle.jpg'), isCorrect: false },
      ],
    },
    {
      shape: 'Square',
      image: require('../../assets/Shapes & Colors/signSquare.jpg'),
      question: 'What is the sign for "Square"?',
      options: [
        { id: '1', image: require('../../assets/Shapes & Colors/signCircle.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/Shapes & Colors/signSquare.jpg'), isCorrect: true },
        { id: '3', image: require('../../assets/Shapes & Colors/signTriangle.jpg'), isCorrect: false },
      ],
    },
    {
      shape: 'Triangle',
      image: require('../../assets/Shapes & Colors/signTriangle.jpg'),
      question: 'What is the sign for "Triangle"?',
      options: [
        { id: '1', image: require('../../assets/Shapes & Colors/signCircle.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/Shapes & Colors/signSquare.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Shapes & Colors/signTriangle.jpg'), isCorrect: true },
      ],
    },
    {
      color: 'Red',
      image: require('../../assets/Shapes & Colors/signRed.jpg'),
      question: 'What is the sign for "Red"?',
      options: [
        { id: '1', image: require('../../assets/Shapes & Colors/signRed.jpg'), isCorrect: true },
        { id: '2', image: require('../../assets/Shapes & Colors/signBlue.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Shapes & Colors/signGreen.jpg'), isCorrect: false },
      ],
    },
    {
      color: 'Blue',
      image: require('../../assets/Shapes & Colors/signBlue.jpg'),
      question: 'What is the sign for "Blue"?',
      options: [
        { id: '1', image: require('../../assets/Shapes & Colors/signRed.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/Shapes & Colors/signBlue.jpg'), isCorrect: true },
        { id: '3', image: require('../../assets/Shapes & Colors/signGreen.jpg'), isCorrect: false },
      ],
    },
    {
      color: 'Green',
      image: require('../../assets/Shapes & Colors/signGreen.jpg'),
      question: 'What is the sign for "Green"?',
      options: [
        { id: '1', image: require('../../assets/Shapes & Colors/signRed.jpg'), isCorrect: false },
        { id: '2', image: require('../../assets/Shapes & Colors/signBlue.jpg'), isCorrect: false },
        { id: '3', image: require('../../assets/Shapes & Colors/signGreen.jpg'), isCorrect: true },
      ],
    },
    // Add more shapes and colors as needed
  ],
};
const QuizScreen = ({ navigation, route }) => {
  const { lessonId } = route.params;
  const questions = questionsByLesson[lessonId];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0); // State to track wrong answers
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(true);

  // Calculate progress based on the user's score
  const progress = (score / questions.length) * 100;
  const questionType = lessonId === '1' ? 'letter' : lessonId === '2' ? 'number' : 'phrase';

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
          // Navigate to ProgressScreen with score, wrongAnswers, and totalQuestions
          navigation.navigate('Progress', { score, wrongAnswers, totalQuestions: questions.length });
        }
      }, 1000);
    } else {
      setWrongAnswers(wrongAnswers + 1); // Increment wrongAnswers count
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
            {`This is the sign for "${questions[currentQuestion][questionType]}":`}
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
              <Text style={[styles.feedbackText, { color: isCorrect ? '#73E000' : '#FF0000' }]}>
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
  container: {
    flex: 1,
    padding: moderateScale(16),
    backgroundColor: '#f5f5f5',
  },
  introContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introText: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
    textAlign: 'center',
    color: '#172937',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  signImage: {
    width: '90%',
    height: verticalScale(250),
    resizeMode: 'contain',
  },
  nextButton: {
    backgroundColor: '#73E000',
    padding: moderateScale(12),
    borderRadius: moderateScale(50),
  },
  nextButtonText: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  counter: {
    fontSize: moderateScale(16),
    color: '#666',
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  question: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
    textAlign: 'center',
    color: '#172937',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: scale(10),
    marginBottom: verticalScale(20),
  },
  option: {
    padding: moderateScale(10),
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  optionImage: {
    width: scale(120),
    height: verticalScale(120),
    resizeMode: 'contain',
  },
  feedbackContainer: {
    marginTop: verticalScale(-6),
    padding: moderateScale(40),
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: moderateScale(18),
    bottom: verticalScale(30), // Position above the bottom navigation
    fontWeight: 'bold',
  },
  tryAgainButton: {
    marginTop: verticalScale(-20),
    backgroundColor: '#FF0000',
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
  },
  tryAgainText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default QuizScreen;