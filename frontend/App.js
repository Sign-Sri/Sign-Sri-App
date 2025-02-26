import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import SplashScreen from './screens/SignIn_and_other/SplashScreen';
import SignInScreen from './screens/SignIn_and_other/SignInScreen';
import SignUpScreen from './screens/SignIn_and_other/SignUpScreen';
import ForgotPasswordScreen from './screens/SignIn_and_other/ForgotPasswordScreen';
import VerifyEmailScreen from './screens/SignIn_and_other/VerifyEmailScreen';
import CreatePasswordScreen from './screens/SignIn_and_other/CreatePasswordScreen';
import PasswordChangedScreen from './screens/SignIn_and_other/PasswordChangedScreen';
import { UserDetailContext } from './Context/UserDetailContext';
import MenuScreen from './screens/MenuScreen'

const Stack = createStackNavigator();

export default function App() {
  // ✅ Move useState inside the function
  const [userDetail, setUserDetail] = useState("");

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#FFFFFF' }
          }}
        >
          {/* Splash Screen */}
          <Stack.Screen name="Splash" component={SplashScreen} />

          {/* Authentication Screens */}
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
          <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
          <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserDetailContext.Provider>
  );
}
