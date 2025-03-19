import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CommunityForumScreen from '../CommunityForumScreen';
import SortByScreen from '../SortByScreen';

const Stack = createStackNavigator();

const PageNavigation = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CommunityForumMain" component={CommunityForumScreen} />
        <Stack.Screen name="SortBy" component={SortByScreen} />
      </Stack.Navigator>
    );
  };

export default PageNavigation

const styles = StyleSheet.create({})