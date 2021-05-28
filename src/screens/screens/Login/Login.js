import React from 'react';
import axios from 'axios';
import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const LoginScreen = ({navigation}) => {
  const [userData, setuserData] = React.useState({
    email: '',
    password: '',
    token: '',
  });

  const onLogin = () => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (userData.email.length === 0) {
      Alert.alert('Error', 'Ingresa tu correo electrónico');
    } else if (userData.password.length === 0) {
      Alert.alert('Error', 'Ingresa la contraseña');
    } else {
      navigation.navigate('HomePageScreen');
      console.log('Acá:', userData);
      axios
        .post('http://10.0.2.2:8000/login/', {
          email: 'user@uc.cl',
          password: '123',
        })
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          saveUser(response);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>CtrlCo</Text>
      </View>
      <Text>Correo Electrónico</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setuserData({...userData, email: text})}
        value={userData.email}
        placeholder={'Correo'}
      />
      <Text>Contraseña</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setuserData({...userData, password: text})}
        value={userData.password}
        placeholder={'Contraseña'}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={() => onLogin()}>
        <Text style={styles.loginText}>INGRESAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.loginText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#000000',
    marginBottom: 40,
  },
  textInput: {
    justifyContent: 'center',
    width: '80%',
    borderRadius: 25,
    borderWidth: 0.5,
    height: 40,
    margin: 12,
    padding: 10,
  },
  loginBtn: {
    width: '50%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});
