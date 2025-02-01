import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './screens/MenuScreen';
import SignToTextScreen from './screens/SignToText/SignToTextScreen';
import TextToSignScreen from './screens/TextToSign/TextToSignScreen';
import SignLanguageDictionaryScreen from './screens/SignLanguageDictionary/SignLanguageDictionaryScreen';
import SignLanguageSchoolScreen from './screens/SignLanguageSchool/SignLanguageSchoolScreen';
import CommunityForumScreen from './screens/CommunityForum/CommunityForumScreen';
import SignLanguagePhraseBookScreen from './screens/SignLanguagePraseBook/SignLanguagePhraseBookScreen';
import LessonScreen from './screens/SignLanguageSchool/LessonScreen';
import QuizScreen from './screens/SignLanguageSchool/QuizScreen';
import ProgressScreen from './screens/SignLanguageSchool/ProgressScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="SignToText" component={SignToTextScreen} />
        <Stack.Screen name="TextToSign" component={TextToSignScreen} />
        <Stack.Screen name="Dictionary" component={SignLanguageDictionaryScreen} />
        <Stack.Screen name="Phrasebook" component={SignLanguagePhraseBookScreen} />
        <Stack.Screen name="School" component={SignLanguageSchoolScreen} />
        <Stack.Screen name="CommunityForum" component={CommunityForumScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;