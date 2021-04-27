import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePageScreen from '../screens/HomePage/HomePageScreen';
import LoginScreen from '../screens/Login/Login';

const MainStack = createStackNavigator();

const MainStackScreen = () => {
  <MainStack.Navigator>
    <MainStack.Screen name="LogInScreen" component={{LoginScreen}} />
    <MainStack.Screen name="HomePageScreen" component={{HomePageScreen}} />
  </MainStack.Navigator>;
};

export default MainStackScreen;
