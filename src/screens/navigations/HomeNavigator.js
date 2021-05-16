import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomePageScreen from '../screens/HomePage/HomePageScreen';
import TerrainScreen from '../screens/Terrain/TerrainScreen';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="HomePageScreen">
    <HomeStack.Screen
      name="HomePageScreen"
      component={HomePageScreen}
      options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="TerrainScreen"
      component={TerrainScreen}
      options={{headerShown: false}}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
