import React, {useState} from 'react';
import {View, Text, Button, TouchableHighlight, Image} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import ImageView from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/Ionicons';
import {showLocation} from 'react-native-map-link';
import {DotIndicator} from 'react-native-indicators';
import axios from 'axios';

const TerrainScreen = ({route, navigation}) => {
  const {id, terrain} = route.params;
  console.log(route.params);
  const backendImages = 'http://desarrollosoftware.tk';
  const firstImage = terrain.property_images.length
    ? backendImages + terrain.property_images[0].cover
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAY4UUVKjiP3MjXyNxAW3FC5CddlG2YLFP31nvwQsN8_aww6DmWTHzdoZd2rvBE_3YlOY&usqp=CAU';

  // const [terrainInfo, setTerrainInfo] = useState({});
  // const terrainInfo = {
  //   id: 8,
  //   title: 'Terreno paty',
  //   description:
  //     'una descrip´pcion bien larga, porque es un terreno de la paty y asi se debe ver bien, no se que mas poner porque soy largo',
  //   surface: 8 * 10,
  //   owner: 'paty@maldonado.cl',
  //   address: 'calle paty',
  //   price: 8 * 1000,
  //   electricity_service: true,
  //   water_service: true,
  //   images: [
  //     'https://www.bienesonline.com/chile/photos/dscf103811331219071.jpg',
  //     'http://imgclasificados5.emol.com/Proyectos/imagenes/docs_corredores/archivos/1101/981647/7f8c4f4f0230abf4910f13669ec3bfd8.jpg',
  //   ],
  //   latitude: -33.335845,
  //   longitude: -70.503277,
  //   services: 'acceso a agua potable y luz',
  // };

  // axios.get(`${backendImages}/`);

  let loaded = true;
  const terrainInfo = terrain;

  const [visible, setVisible] = useState(false);

  return loaded ? (
    <View style={{flex: 1}}>
      <View style={{flex: 2, paddingHorizontal: RFPercentage(4)}}>
        <View style={{flex: 0.5, alignItems: 'center'}}>
          <Text
            style={{fontSize: RFPercentage(5), flex: 1}}
            adjustsFontSizeToFit>
            {terrainInfo.title}
          </Text>
        </View>
        <View style={{flex: 1, paddingBottom: RFPercentage(2)}}>
          <TouchableHighlight onPress={() => setVisible(true)}>
            <Image
              source={{uri: firstImage}}
              style={{height: '100%', borderRadius: RFPercentage(3)}}
            />
          </TouchableHighlight>
        </View>
        <View
          style={{
            flex: 1.5,
            borderWidth: RFPercentage(0.5),
            marginBottom: RFPercentage(1),
          }}>
          <Text>{terrainInfo.description}</Text>
          <Text>Superficie: {terrainInfo.surface}</Text>
          <Text>{terrainInfo.address}</Text>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name={terrainInfo.electricity_service ? 'flash' : 'flash-outline'}
              color={terrainInfo.electricity_service ? 'yellow' : 'black'}
              size={RFPercentage(3)}
            />
            <Icon
              name={terrainInfo.water_service ? 'water' : 'water-outline'}
              color={terrainInfo.water_service ? 'blue' : 'black'}
              size={RFPercentage(3)}
            />
          </View>
          <Text>${terrainInfo.price}</Text>
          <Text>{terrainInfo.owner}</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: RFPercentage(4),
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: RFPercentage(2),
            alignItems: 'center',
          }}>
          <Icon
            name="navigate"
            color={'black'}
            size={26}
            style={{marginRight: RFPercentage(2)}}
          />
          <Button
            title="Ver en Maps"
            onPress={() =>
              showLocation({
                latitude: terrainInfo.latitude,
                longitude: terrainInfo.longitude,
              })
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: RFPercentage(2),
            alignItems: 'center',
          }}>
          <Icon
            name="mail"
            color={'black'}
            size={26}
            style={{marginRight: RFPercentage(2)}}
          />
          <Button
            title="Enviar Mensaje"
            onPress={() =>
              navigation.navigate('MessageStackScreens', {
                screen: 'MessageScreen',
                params: {name: 'Nombre', from: 'terrain', id},
              })
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: RFPercentage(2),
            alignItems: 'center',
          }}>
          <Icon
            name="calendar"
            color={'black'}
            size={26}
            style={{marginRight: RFPercentage(2)}}
          />
          <Button
            title="Agendar Visita"
            onPress={() =>
              navigation.navigate('MessageStackScreens', {
                screen: 'CalendarScreen',
                params: {id},
              })
            }
          />
        </View>
      </View>
      <ImageView
        images={terrainInfo.property_images.map(im => ({
          uri: backendImages + im.cover,
        }))}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  ) : (
    <DotIndicator color="grey" />
  );
};

export default TerrainScreen;
