
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { moderateScale } from "react-native-size-matters";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';


import BottomTabNavigator from "./BottomTabNavigator";
import MenuScreen from '../MenuScreen';
import SignToTextScreen from '../SignToText/SignToTextScreen';
import TextToSignScreen from '../TextToSign/TextToSignScreen';
import SchoolScreen from '../SignLanguageSchool/SignLanguageSchoolScreen';
import CommunityForumScreen from '../CommunityForum/CommunityForumScreen';



const Stack = createStackNavigator();


const StackNavigator = () => {
  return (
    <SafeAreaProvider>
          <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

          <NavigationContainer>
              
                    <Stack.Navigator 
                      initialRouteName="Home"
                      screenOptions={{
                        headerStyle: { 
                          backgroundColor: '#172937',
                        }, 
                        headerTintColor: '#FFFFFF', 
                        headerTitleStyle: { 
                          fontWeight: 'bold',
                          letterSpacing: moderateScale(1),
                          fontSize: moderateScale(25),
                           
                          
                        },
                        
                      }}
                    >
                        {/* Bottom Tab Navigator */}
                        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
                        <Stack.Screen name="Home" component={MenuScreen} />
                        <Stack.Screen name="Sign To Text" component={SignToTextScreen} />
                        <Stack.Screen name="Text To Sign" component={TextToSignScreen} />
                        <Stack.Screen name="Sign Language School" component={SchoolScreen} />
                        <Stack.Screen name="Community Forum" component={CommunityForumScreen} />
                    </Stack.Navigator>
                  
          </NavigationContainer>
    </SafeAreaProvider> 
    
  )
}

export default StackNavigator