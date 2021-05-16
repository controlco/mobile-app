import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MessageMenuScreen from '../screens/MessageMenu/MessageMenuScreen';
import MessageScreen from '../screens/Message/MessageScreen';
import {HeaderBackButton} from '@react-navigation/stack';

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
      options={({navigation, route}) => ({
        title: route.params.name || 'None',
        headerLeft: prop => (
          <HeaderBackButton
            {...prop}
            onPress={() => {
              route.params.from === 'terrain'
                ? navigation.navigate('HomeStackScreen', {
                    screen: 'TerrainScreen',
                    params: {id: route.params.id},
                  })
                : navigation.navigate('MessageMenuScreen');
            }}
          />
        ),
      })}
    />
  </MessagesStack.Navigator>
);

export default MessageStackScreens;
