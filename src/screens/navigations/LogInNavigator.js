import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePageScreen from '../screens/HomePage/HomePageScreen';
import LoginScreen from '../screens/Login/Login';
import SignUpScreen from '../screens/SignUp/SignsUpScreen';
import BottomTab from './BottomTab';

const LogInStack = createStackNavigator();

const LogInStackScreens = () => (
  <LogInStack.Navigator initialRouteName="LogInScreen">
    <LogInStack.Screen
      name="LogInScreen"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <LogInStack.Screen
      name="SignUpScreen"
      component={SignUpScreen}
      options={{title: 'Sign Up'}}
    />
    <LogInStack.Screen
      name="BottomTab"
      component={BottomTab}
      options={{headerShown: false}}
    />
  </LogInStack.Navigator>
);

export default LogInStackScreens;
