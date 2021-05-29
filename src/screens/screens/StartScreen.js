import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import MainStackScreen from '../navigations/MainNavigator';
import {Provider} from 'react-redux';
import {store} from '../../../redux/store';

const StartScreen = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default StartScreen;
