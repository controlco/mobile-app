import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {View, Text, ActivityIndicator, ScrollView} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import TerrainCard from '../../../components/TerrainCard';
import {getComunesAndRegions} from './regionsAndComunes';
import {DotIndicator} from 'react-native-indicators';

const HomePageScreen = ({navigation}) => {
  const [regionsComunes, setRegionsComunes] = useState({});
  const [comunesData, setComunesData] = useState([]);
  const [comune, setComune] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const [properties, setProperties] = useState([]);

  let key = 0;

  useEffect(() => {
    getComunesAndRegions().then(regionsAndComunes => {
      setRegionsComunes(regionsAndComunes);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (comune > -1) {
      axios
        .get(`http://desarrollosoftware.tk/districts/${comune}/properties`)
        .then(response => setProperties(response.data))
        .catch(error => alert(error));
    }
  }, [comune]);

  return (
    <View style={{flex: 1}}>
      {loaded ? (
        <ScrollView>
          <View>
            <Text style={{alignSelf: 'center'}}>Seleccione Region</Text>
            <ModalSelector
              data={regionsComunes.regions}
              initValue="Seleccione Region"
              supportedOrientations={['portrait']}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={value =>
                setComunesData(regionsComunes.comunes[value.label])
              }
            />
          </View>

          <View>
            <Text style={{alignSelf: 'center'}}>Seleccione Comuna</Text>
            <ModalSelector
              data={comunesData}
              initValue="Seleccione Comuna!"
              supportedOrientations={['portrait']}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={value => setComune(value.id)}
            />
          </View>
          <View>
            {properties.map(terrain => {
              return (
                <View key={key++} style={{flex: 1}}>
                  <TerrainCard terrain={terrain} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <DotIndicator color="grey" />
      )}
    </View>
  );
};

export default HomePageScreen;
