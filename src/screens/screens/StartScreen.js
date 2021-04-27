import React from 'react';
import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const StartScreen = () => {
  return (
    <NavigationContainer>
      <View>
        <Text>Hello World</Text>
      </View>
    </NavigationContainer>
  );
};

export default StartScreen;
