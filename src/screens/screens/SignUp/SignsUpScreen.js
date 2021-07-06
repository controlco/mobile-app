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
import {login} from '../../../../redux/actions';
import {store} from '../../../../redux/store';

const SignUpScreen = ({navigation}) => {
  const [userData, setUserData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    rut: '',
    birth_date: '',
  });
  const onSignUp = () => {
    const regex_email =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regex_rut = /\b(\d{1,3}(\d{1,3}){2}-[\dkK])\b/;
    const regex_date =
      /^\s*((?:19|20)\d{2})\-(1[012]|0?[1-9])\-(3[01]|[12][0-9]|0?[1-9])\s*$/;
    if (userData.first_name.length === 0) {
      Alert.alert('Error', 'Ingresa un nombre válido');
    } else if (userData.last_name.length === 0) {
      Alert.alert('Error', 'Ingresa un apellido válido');
    } else if (
      !regex_email.test(userData.email) ||
      userData.email.length === 0
    ) {
      Alert.alert('Error', 'Ingresa un correo válido');
    } else if (userData.password.length <= 8) {
      Alert.alert('Error', 'La contraseña debe contener mínimo 8 caracteres');
    } else if (userData.password.length !== userData.confirmPassword.length) {
      Alert.alert('Error', 'Las contraseña no coinciden');
    } else if (
      !regex_rut.test(userData.rut) ||
      userData.rut.length < 9 ||
      userData.rut.length > 10
    ) {
      Alert.alert('Error', 'Ingresa un RUT válido');
    } else if (!regex_date.test(userData.birth_date)) {
      Alert.alert('Error', 'Ingresa una fecha válida');
    } else {
      axios
        .post('https://desarrollosoftware.tk/signup', {
          email: userData.email,
          password: userData.password,
          first_name: userData.first_name,
          last_name: userData.last_name,
          rut: userData.rut,
          is_owner: false,
          birth_date: userData.birth_date + ' 06:00:00',
        })
        .then(function () {
          axios
            .post('https://desarrollosoftware.tk/login', {
              email: userData.email,
              password: userData.password,
            })
            .then(function (response) {
              store.dispatch(login(userData, response.data.token));
              navigation.navigate('BottomTab');
            })
            .catch(function (error) {
              Alert.alert('Error', 'Ha ocurrido un error, intenta nuevamente.');
            });
          navigation.navigate('BottomTab');
        })
        .catch(function (error) {
          Alert.alert('Error', 'Ha ocurrido un error, intenta nuevamente.');
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>CtrlCo</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text styles={styles.label}>Nombre*</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setUserData({...userData, first_name: text})}
            value={userData.first_name}
            placeholder={'Nombre'}
          />
        </View>
        <Text styles={styles.label}>Apellido*</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setUserData({...userData, last_name: text})}
            value={userData.last_name}
            placeholder={'Apellido'}
          />
        </View>
        <Text styles={styles.label}>Correo Electrónico*</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setUserData({...userData, email: text})}
            value={userData.email}
            placeholder={'Correo Electrónico'}
          />
        </View>
        <Text styles={styles.label}>Cumpleaños</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setUserData({...userData, birth_date: text})}
            value={userData.birth_date}
            placeholder={'aaaa-mm-dd'}
          />
        </View>
        <Text styles={styles.label}>Rut</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setUserData({...userData, rut: text})}
            value={userData.rut}
            placeholder={'12345678-9'}
          />
        </View>
        <Text styles={styles.label}>Contraseña*</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setUserData({...userData, password: text})}
            value={userData.password}
            placeholder={'Contraseña'}
            secureTextEntry={true}
          />
        </View>
        <Text styles={styles.label}>Confirmar Contraseña*</Text>
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

      <View style={styles.actions}>
        <TouchableOpacity style={styles.loginBtn} onPress={() => onSignUp()}>
          <Text style={styles.loginText}>REGISTRARSE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LogInScreen')}>
          <Text style={styles.loginText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
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
  scrollView: {
    width: '90%',
  },
  header: {
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
  actions: {
    alignItems: 'center',
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
