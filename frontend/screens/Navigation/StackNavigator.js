
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { moderateScale, scale,verticalScale } from "react-native-size-matters";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';


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
                          borderBottomRightRadius:scale(100),
                          height:verticalScale(120),
                          
                        }, 
                        headerTintColor: '#FFFFFF', 
                        headerTitleStyle: { 
                          fontWeight: 'bold',
                          letterSpacing: moderateScale(1),
                          fontSize: moderateScale(22),
                           
                          
                        },
                        
                      }}
                    >
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