import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MessageMenuScreen from '../screens/MessageMenu/MessageMenuScreen';
import MessageScreen from '../screens/SignUp/SignsUpScreen';

const MessagesStack = createStackNavigator();

const MessageStackScreens = () => (
  <MessagesStack.Navigator initialRouteName="MessageMenuScreen">
    <MessagesStack.Screen
      name="MessageMenuScreen"
      component={MessageMenuScreen}
      options={{headerShown: false}}
    />
    <MessagesStack.Screen
      name="MessageScreen"
      component={MessageScreen}
      options={({route}) => ({
        title: route.params.name || 'None',
      })}
    />
  </MessagesStack.Navigator>
);

export default MessageStackScreens;
