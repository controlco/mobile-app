import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MessageStackScreens from './MessagesNavigator';
import HomePageScreen from '../screens/HomePage/HomePageScreen';
import ProfileStackScreens from './ProfileNavigator';

const Tab = createBottomTabNavigator();

const BottomTab = () => (
  <Tab.Navigator
    initialRouteName="HomePageScreen"
    activeColor="red"
    inactiveColor="blue"
    labeled={false}>
    <Tab.Screen
      name="MessageStackScreens"
      component={MessageStackScreens}
      options={{
        title: 'Messages',
        tabBarIcon: ({color}) => (
          <Icon name="mail-open-outline" color={color} size={26} />
        ),
        tabBarBadge: 3,
      }}
    />

    <Tab.Screen
      name="HomePageScreen"
      component={HomePageScreen}
      options={{
        title: 'Home Page',
        tabBarIcon: ({color}) => (
          <Icon name="home-outline" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="ProfileStackScreens"
      component={ProfileStackScreens}
      options={{
        title: 'Calendar',
        tabBarIcon: ({color}) => (
          <Icon name="calendar-outline" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomTab;
