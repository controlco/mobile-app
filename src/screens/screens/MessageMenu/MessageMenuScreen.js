import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
import {store} from '../../../../redux/store';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {useEffect} from 'react';

const MessageMenuScreen = ({navigation}) => {
  const [search, setSearch] = useState('');

  const state = store.getState();
  const userData = jwt_decode(state.userToken);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const updateSentMessages = () => {
    setRefreshing(true);
    setLoading(true);
    console.log('si');
    const backUrl = `https://desarrollosoftware.tk/users/${userData.user_id}/messages/sent/`;
    axios
      .get(backUrl, {headers: {Authorization: `Bearer ${state.userToken}`}})
      .then(response => {
        const uniqueIds = [];
        const uniqueObj = [];
        response.data.forEach(obj => {
          if (!uniqueIds.includes(obj.to_user)) {
            uniqueIds.push(obj.to_user);
            uniqueObj.push({
              to_user: obj.to_user,
              to_user_email: obj.to_user_email,
            });
          }
        });
        console.log(uniqueObj);
        setMessages(uniqueObj);
        console.log(messages);
        setLoading(false);
      })
      .catch(error => {
        alert(error);
        setLoading(false);
      });
    setRefreshing(false);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        const backUrl = `https://desarrollosoftware.tk/users/${item.to_user}/messages/`;
        axios
          .get(backUrl, {
            headers: {Authorization: `Bearer ${state.userToken}`},
          })
          .then(response => {
            return response.data;
          })
          .then(messagesResp => {
            navigation.navigate('MessageStackScreens', {
              screen: 'MessageScreen',
              params: {
                name: item.to_user_email,
                owner_id: item.to_user,
                initialMessages: messagesResp,
                change: true,
              },
            });
          })
          .catch(error => {
            alert(error);
          });
      }}>
      <View
        style={{
          flex: 1,
          maxWidth: '95%',
          minWidth: '95%',
          backgroundColor: 'white',
          borderStyle: 'solid',
          borderColor: 'grey',
          margin: 3,
          padding: 10,
        }}>
        <Text>{item.to_user_email}</Text>
      </View>
    </TouchableOpacity>
  );

  let itemsIds = 0;

  useEffect(() => updateSentMessages(), [navigation.isFocused()]);
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text>Available Chats</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={() => itemsIds++}
        onRefresh={updateSentMessages}
        refreshing={refreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    borderColor: '#888888',
    fontSize: 18,
    height: 50,
    minWidth: '80%',
    maxWidth: '80%',
  },
});

export default MessageMenuScreen;
