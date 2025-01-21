import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './screens/MenuScreen';
import SignToTextScreen from './screens/SignToTextScreen';
import TextToSignScreen from './screens/TextToSignScreen';
import SignLanguageDictionaryScreen from './screens/SignLanguageDictionaryScreen';
import SchoolScreen from './screens/SignLanguageSchoolScreen';
import CommunityForumScreen from './screens/CommunityForumScreen';
import SignLanguagePhraseBookScreen from './screens/SignLanguagePhraseBookScreen';

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
                <Stack.Screen name="School" component={SchoolScreen} />
                <Stack.Screen name="CommunityForum" component={CommunityForumScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
