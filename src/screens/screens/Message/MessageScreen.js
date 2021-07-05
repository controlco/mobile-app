import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
} from 'react-native';
import {store} from '../../../../redux/store';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {DotIndicator} from 'react-native-indicators';
import {useIsFocused, useRoute} from '@react-navigation/native';

const MessageScreen = ({route, navigation}) => {
  const {name, owner_id, initialMessages, change} = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const state = store.getState();
  const userData = jwt_decode(state.userToken);

  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (change) {
      setMessages(initialMessages);
      navigation.setParams({
        name: name,
        owner_id,
        initialMessages,
        change: false,
      });
    }
  }, [route]);

  const updateMessages = () => {
    setRefreshing(true);
    setLoading(true);
    console.log('si');
    const backUrl = `https://desarrollosoftware.tk/users/${owner_id}/messages/`;
    axios
      .get(backUrl, {headers: {Authorization: `Bearer ${state.userToken}`}})
      .then(response => {
        setMessages(response.data);
        setLoading(false);
      })
      .catch(error => {
        alert(error);
        setLoading(false);
      });
    setRefreshing(false);
  };

  const isFocused = useIsFocused();

  const sendMessage = () => {
    const data = {
      subject: '[No Subject]',
      content,
      to_user: owner_id,
    };
    console.log(data);
    const headers = {
      Authorization: `Bearer ${state.userToken}`,
      'Content-Type': 'application/json',
    };
    console.log(`https://desarrollosoftware.tk/users/${owner_id}/messages/`);
    axios
      .post(`https://desarrollosoftware.tk/users/${owner_id}/messages/`, data, {
        headers,
      })
      .then(() => {
        updateMessages();
        setContent('');
      })
      .catch(error => {
        alert(error);
      });
  };

  const renderItem = ({item}) => (
    <View
      style={{
        flex: 1,
        maxWidth: '85%',
        minWidth: '85%',
        alignSelf:
          item.from_id !== userData.user_id ? 'flex-start' : 'flex-end',
        backgroundColor: item.from_id !== userData.user_id ? 'grey' : '#57a639',
        borderStyle: 'solid',
        borderColor: 'grey',
        margin: 3,
        padding: 10,
      }}>
      <Text
        style={{
          alignSelf:
            item.from_id !== userData.user_id ? 'flex-start' : 'flex-end',
        }}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{flex: 4}}>
        {loading ? (
          <DotIndicator color="grey" />
        ) : !messages.length ? (
          <View>
            <Text>No messages</Text>
            <FlatList
              data={messages}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              onRefresh={updateMessages}
              refreshing={refreshing}
            />
          </View>
        ) : (
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onRefresh={updateMessages}
            refreshing={refreshing}
          />
        )}
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 3}}>
          <TextInput
            style={styles.searchBar}
            placeholder="Content"
            onChangeText={setContent}
            value={content}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
            title="Send"
            style={{maxWidth: '90%', minWidth: '90%', height: '90%'}}
            onPress={sendMessage}
          />
        </View>
      </View>
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
    minWidth: '90%',
    maxWidth: '90%',
  },
});

export default MessageScreen;
