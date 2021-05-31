import React, {useState} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

const MessageMenuScreen = () => {
  const [search, setSearch] = useState('');

  // const messages

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View>
        <TextInput onChangeText={setSearch} style={styles.searchBar} />
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
    minWidth: '80%',
    maxWidth: '80%',
  },
});

export default MessageMenuScreen;
