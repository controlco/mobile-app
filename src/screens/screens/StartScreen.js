import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from '../../../redux/store';

import LogInStackScreens from '../navigations/LogInNavigator';

const StartScreen = () => {
  let loggedIn = false;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <LogInStackScreens />
      </NavigationContainer>
    </Provider>
  );
};

export default StartScreen;
