import React from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const SignUpScreen = ({navigation}) => {
  const [userData, setUserData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    lastname: '',
  });
  const fetchF = () => {
    console.log('Acá');
    fetch('http://10.0.2.2:8000/login/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {},
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };
  const onSignUp = () => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (userData.name.length === 0) {
      Alert.alert('Error', 'Ingresa un nombre válido');
    } else if (userData.lastname.length === 0) {
      Alert.alert('Error', 'Ingresa un apellido válido');
    } else if (!regex.test(userData.email) || userData.email.length === 0) {
      Alert.alert('Error', 'Ingresa un correo válido');
    } else if (userData.password.length <= 8) {
      Alert.alert('Error', 'La contraseña debe contener mínimo 8 caracteres');
    } else {
      axios
        .post('http://10.0.2.2:8000/login/', {
          email: 'maconcha4',
          password: 'maconcha4',
          userId: 1,
        })
        .then(function (response) {
          // handle success
          alert(JSON.stringify(response.data));
        })
        .catch(function (error) {
          // handle error
          alert(error.message);
        });
    }
  };
  return (
    <View style={styles.container}>
      {fetchF()}
      <View style={styles.header}>
        <Text style={styles.textHeader}>CtrlCo</Text>
      </View>
      <ScrollView>
        <Text styles={styles.label}>Nombre</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setUserData({...userData, name: text})}
            value={userData.name}
            placeholder={'Nombre'}
          />
        </View>
        <Text styles={styles.label}>Apellido</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setUserData({...userData, lastname: text})}
            value={userData.lastname}
            placeholder={'Apellido'}
          />
        </View>
        <Text styles={styles.label}>Correo Electrónico</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setUserData({...userData, email: text})}
            value={userData.email}
            placeholder={'Correo Electrónico'}
          />
        </View>
        <Text styles={styles.label}>Contraseña</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setUserData({...userData, password: text})}
            value={userData.password}
            placeholder={'Contraseña'}
            secureTextEntry={true}
          />
        </View>
        <Text styles={styles.label}>Confirmar Contraseña</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onChangeText={text =>
              setUserData({...userData, confirmPassword: text})
            }
            value={userData.confirmPassword}
            placeholder={'Confirmar Contraseña'}
            secureTextEntry={true}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.loginBtn} onPress={() => onSignUp()}>
        <Text style={styles.loginText}>REGISTRARSE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LogInScreen')}>
        <Text style={styles.loginText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
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
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    width: 150,
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
