import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";

// Import Screens
import MenuScreen from "../MenuScreen";
import PhrasebookScreen from "../SignLanguagePraseBook/SignLanguagePhraseBookScreen";
import DictionaryScreen from "../SignLanguageDictionary/SignLanguageDictionaryScreen";
import ShopScreen from "../Shop/ShopScreen";
import ProfileScreen from "../Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: "#172937", height: moderateScale(60) },
          tabBarActiveTintColor: "#73E000",
          tabBarInactiveTintColor: "#B0B0B0",
          tabBarLabelStyle: { fontSize: moderateScale(12), fontWeight: "bold" },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Phrasebook":
                iconName = "book";
                break;
              case "Dictionary":
                iconName = "book-reader";
                break;
              case "Shop":
                iconName = "shopping-cart";
                break;
              case "Profile":
                iconName = "user";
                break;
              default:
                iconName = "circle";
            }
            return <FontAwesome5 name={iconName} size={moderateScale(20)} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={MenuScreen} />
        <Tab.Screen name="Phrasebook" component={PhrasebookScreen} />
        <Tab.Screen name="Dictionary" component={DictionaryScreen} />
        <Tab.Screen name="Shop" component={ShopScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
