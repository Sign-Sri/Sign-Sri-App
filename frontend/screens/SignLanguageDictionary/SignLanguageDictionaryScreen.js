import { View, Text } from 'react-native';
import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import LetterScreen from "./src/screens/LetterScreen";

const Stack = createStackNavigator();

const SignLanguageDictionaryScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Letter" component={LetterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SignLanguageDictionaryScreen;