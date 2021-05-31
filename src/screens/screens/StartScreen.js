import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import MainStackScreen from '../navigations/MainNavigator';
import {Provider} from 'react-redux';
import {store} from '../../../redux/store';

import BottomTab from '../navigations/BottomTab';
import LogInStackScreens from '../navigations/LogInNavigator';

const StartScreen = () => {
  let loggedIn = false;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </Provider>
  );
};

export default StartScreen;
