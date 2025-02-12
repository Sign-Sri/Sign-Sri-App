
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import MenuScreen from '../MenuScreen';
import SignToTextScreen from '../SignToText/SignToTextScreen';
import TextToSignScreen from '../TextToSign/TextToSignScreen';
import SchoolScreen from '../SignLanguageSchool/SignLanguageSchoolScreen';
import CommunityForumScreen from '../CommunityForum/CommunityForumScreen';


const Stack = createStackNavigator();


const StackNavigator = () => {
  return (
    <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={MenuScreen} />
                <Stack.Screen name="Sign To Text" component={SignToTextScreen} />
                <Stack.Screen name="Text To Sign" component={TextToSignScreen} />
                <Stack.Screen name="Sign Language School" component={SchoolScreen} />
                <Stack.Screen name="Community Forum" component={CommunityForumScreen} />
            </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator