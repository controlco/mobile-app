import React from 'react';
import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from '../navigations/BottomTab';
import LogInStackScreens from '../navigations/LogInNavigator';

const StartScreen = () => {
  let loggedIn = false;

  return (
    <NavigationContainer>
      {loggedIn ? <BottomTab /> : <LogInStackScreens />}
    </NavigationContainer>
  );
};

export default StartScreen;
