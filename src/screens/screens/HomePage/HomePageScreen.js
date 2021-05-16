import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, ScrollView} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {regions, comunes} from './regionsAndComunes';
import TerrainCard from '../../../components/TerrainCard';

const HomePageScreen = ({navigation}) => {
  const [comunesData, setComunesData] = useState([]);
  const [comune, setComune] = useState('');
  const [cat, setCat] = useState(false);

  let key = 0;
  const terrainModel = id => ({
    id,
    title: `Terreno ${id}`,
    surface: id * 10,
    owner: `email${id}@uc.cl`,
    address: `calle falsa ${id}`,
    price: id * 1000,
    images: [
      'https://www.bienesonline.com/chile/photos/dscf103811331219071.jpg',
      'http://imgclasificados5.emol.com/Proyectos/imagenes/docs_corredores/archivos/1101/981647/7f8c4f4f0230abf4910f13669ec3bfd8.jpg',
    ],
  });

  const terrains = [];
  for (const x of Array(8).keys()) {
    terrains.push(terrainModel(x));
  }
  terrains.push({
    id: 8,
    title: `Terreno paty`,
    surface: 8 * 10,
    owner: 'paty@maldonado.cl',
    address: 'calle paty',
    price: 8 * 1000,
    images: [
      'https://www.lacuarta.com/wp-content/uploads/2019/01/maldonado.jpg',
      'https://www.lacuarta.com/wp-content/uploads/2018/11/Patricia-Maldonado.jpg'
    ],
  })

  useEffect(() => {
    fetch('http://aws.random.cat/meow')
      .then(response => response.json())
      .then(catJson => {
        console.log(catJson);
        setCat(catJson.file);
      });
  }, [comune]);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View>
          <Text style={{alignSelf: 'center'}}>Seleccione Region</Text>
          <ModalSelector
            data={regions}
            initValue="Seleccione Region"
            supportedOrientations={['portrait']}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={value => setComunesData(comunes[value.label])}
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
            onChange={value => setComune(value.label)}
          />
        </View>
        <View>
          {terrains ? (
            terrains.map(terrain => {
              return (
                <View key={key++} style={{flex: 1}}>
                  <TerrainCard
                    id={terrain.id}
                    title={terrain.title}
                    surface={terrain.surface}
                    owner={terrain.owner}
                    price={terrain.price}
                    address={terrain.address}
                    images={terrain.images}
                  />
                </View>
              );
            })
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePageScreen;
