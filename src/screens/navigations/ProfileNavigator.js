import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const ProfileStack = createStackNavigator();

const ProfileStackScreens = () => (
  <ProfileStack.Navigator initialRouteName="MessageMenuScreen">
    <ProfileStack.Screen
      name="CalendarScreen"
      component={CalendarScreen}
      options={{headerShown: false}}
    />

    <ProfileStack.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={{
        title: 'Settings',
      }}
    />
  </ProfileStack.Navigator>
);

export default ProfileStackScreens;
