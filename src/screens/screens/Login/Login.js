import React from 'react';
import {View, Text, Button, Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const LoginScreen = ({navigation}) => {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  // Agregar validaciones de correo con regex.
  const onLogin = () => {
    if (email.length == 0 || password.length == 0){
      Alert.alert('Error', 'Email o constraseña no válidos');
    } else {
      navigation.navigate('HomePageScreen')
    };
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Login</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          style={{ borderWidth: 1, height: 40, margin: 12, width: 150, padding: 10}}
          onChangeText={onChangeEmail}
          value={email}
          placeholder={"Correo"}
        />
        <TextInput
          style={{borderWidth: 1, height: 40, margin: 12, width: 150, padding: 10}}
          onChange={onChangePassword}
          value={password}
          placeholder={"Contraseña"}
          secureTextEntry={true}
          
        />
        <Button
          title="Log in"
          onPress={() => onLogin()}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
