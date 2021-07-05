import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomePageScreen from '../screens/HomePage/HomePageScreen';
import TerrainScreen from '../screens/Terrain/TerrainScreen';
import ReportScreen from '../screens/Report/ReportScreen';
import {HeaderBackButton} from '@react-navigation/stack';

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
    <HomeStack.Screen
      name="ReportScreen"
      component={ReportScreen}
      options={({navigation, route}) => ({
        title: route.params.name || 'None',
        headerLeft: prop => (
          <HeaderBackButton
            {...prop}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      })}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
