import React from 'react';
import {useColorScheme} from 'react-native';

import StartScreen from './src/screens/screens/StartScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return <StartScreen />;
};

export default App;
