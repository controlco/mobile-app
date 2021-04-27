import React from 'react';
import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStackScreen from '../navigations/MainNavigator';

const StartScreen = () => {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
};

export default StartScreen;
