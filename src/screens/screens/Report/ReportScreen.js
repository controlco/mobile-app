import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import {store} from '../../../../redux/store';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const ReportScreen = ({route, navigation}) => {
  const {owner_id} = route.params;
  const [report, setReport] = useState('');
  const [title, setTitle] = useState('');
  const state = store.getState();
  const userData = jwt_decode(state.userToken);

  const sendReport = () => {
    const body = {
      title,
      content: report,
      reported_user: owner_id,
    };
    const backUrl = `https://desarrollosoftware.tk/reports/`;
    axios
      .post(backUrl, body, {
        headers: {Authorization: `Bearer ${state.userToken}`},
      })
      .then(response => {
        const report_return = response.data;
        if (report_return.title) alert('Report recieved');
        navigation.goBack();
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        placeholder="Enter Title"
        onChangeText={setTitle}
        value={title}
        style={{...styles.searchBar, flex: 0.5}}
      />
      <TextInput
        placeholder="Enter reason of report"
        onChangeText={setReport}
        value={report}
        style={{...styles.searchBar, flex: 1}}
      />
      <View style={{justifyContent: 'space-between', flex: 2}}>
        <Button title="Send Report" onPress={sendReport} />
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

export default ReportScreen;
