import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeStackNavigator from './HomeStackNavigator'; // We'll create this
import PhrasebookScreen from '../SignLanguagePraseBook/SignLanguagePhraseBookScreen'; // Create this screen
import DictionaryScreen from '../SignLanguageDictionary/SignLanguageDictionaryScreen'; // Create this screen
import LeaderboardScreen from '../Leaderboard/LeaderBoardScreen'; // Create this screen
import ProfileScreen from '../Profile/ProfileScreen'; // Create this screen

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Phrasebook') {
            iconName = 'book';
          } else if (route.name === 'Dictionary') {
            iconName = 'search';
          } else if (route.name === 'Leaderboard') {
            iconName = 'trophy';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <FontAwesome5 name={iconName} size={moderateScale(size)} color={color} />;
        },
        tabBarActiveTintColor: '#73E000',
        tabBarInactiveTintColor: '#172937',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: verticalScale(55),
          paddingBottom: verticalScale(5),
        },
        tabBarLabelStyle: {
          fontSize: moderateScale(10),
          fontWeight: 'bold',
          marginBottom: verticalScale(5),
        },
        headerShown: route.name !== 'Home', // Hide header only for the Home tab
        headerStyle: {
          backgroundColor: '#172937',
          borderBottomRightRadius: scale(100),
          height: verticalScale(120),
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          letterSpacing: moderateScale(1),
          fontSize: moderateScale(22),
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ headerShown: false }} // Hide header for the Home tab
      />
      <Tab.Screen name="Phrasebook" component={PhrasebookScreen} />
      <Tab.Screen name="Dictionary" component={DictionaryScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;