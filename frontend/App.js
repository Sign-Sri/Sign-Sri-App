import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LeaderBoardScreen from './screens/LeaderBoard/LeaderBoardScreen';
import LeaderBoardItem from './screens/LeaderBoard/LeaderBoardItem';

import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='LeaderBoardScreen' component={LeaderBoardScreen}/>
                <Stack.Screen name='LeaderBoardItem' component={LeaderBoardItem}/>
                {/* Add other screens here */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;


export const sharedStyles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
