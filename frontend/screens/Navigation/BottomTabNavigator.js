import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native'; // Import View and StyleSheet

import HomeStackNavigator from './HomeStackNavigator'; // We'll create this
import PhrasebookScreen from '../SignLanguagePraseBook/SignLanguagePhraseBookScreen'; // Create this screen
import DictionaryScreen from '../SignLanguageDictionary/SignLanguageDictionaryScreen'; // Create this screen
import LeaderboardScreen from '../LeaderBoard/LeaderBoardScreen'; // Create this screen
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

          
          return (
            <View style={focused ? styles.activeTab : null}>
              <FontAwesome5 name={iconName} size={moderateScale(size)} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: 'FFFFFF',
        tabBarInactiveTintColor: '#696969',
        tabBarStyle: {
          backgroundColor: '#172937',//
          borderTopWidth: 0,
          height: verticalScale(55),
          paddingBottom: verticalScale(5),
        },
        tabBarLabelStyle: {
          fontSize: moderateScale(10),
          fontWeight: 'bold',
          marginBottom: verticalScale(5),
        },
        headerShown: route.name !== 'Home', 
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

// Define styles for the active tab circle
const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: '#D3D3D3', // Light grey color
    borderRadius: moderateScale(20), // Circular shape
    width: moderateScale(50), // Fixed width for the circle
    height: moderateScale(33), // Fixed height for the circle
    justifyContent: 'center', // Center the icon horizontally
    alignItems: 'center', // Center the icon vertically
  },
});

export default BottomTabNavigator;