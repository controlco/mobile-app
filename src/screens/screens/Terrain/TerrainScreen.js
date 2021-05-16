import React, {useState} from 'react';
import {View, Text, Button, TouchableHighlight, Image} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import ImageView from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/Ionicons';
import {showLocation} from 'react-native-map-link';

const TerrainScreen = ({route, navigation}) => {
  const {id} = route.params;
  const terrainInfo = {
    id: 8,
    title: 'Terreno paty',
    description:
      'una descrip´pcion bien larga, porque es un terreno de la paty y asi se debe ver bien, no se que mas poner porque soy largo',
    surface: 8 * 10,
    owner: 'paty@maldonado.cl',
    address: 'calle paty',
    price: 8 * 1000,
    images: [
      'https://www.bienesonline.com/chile/photos/dscf103811331219071.jpg',
      'http://imgclasificados5.emol.com/Proyectos/imagenes/docs_corredores/archivos/1101/981647/7f8c4f4f0230abf4910f13669ec3bfd8.jpg',
    ],
    latitude: -33.335845,
    longitude: -70.503277,
    services: 'acceso a agua potable y luz',
  };

  const [visible, setVisible] = useState(false);
  // return (
  //   <View>
  //     <View style={{alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around'}}>
  //       <View style={{flex: 1}}>
  //         <Text style={{fontSize: RFPercentage(5)}}>{terrainInfo.title}</Text>
  //       </View>
  //       <View style={{flex: 1, backgroundColor: 'black'}}>
  //       {/* <TouchableHighlight onPress={() => setVisible(true)}> */}

  //       {/* </TouchableHighlight> */}
  //       </View>
  //     </View>
  //     <View style={{flex: 2}}>
  //       <Button
  //         title="Message"
  //         onPress={() =>
  //           navigation.navigate('MessageStackScreens', {
  //             screen: 'MessageScreen',
  //             params: {name: 'Nombre', from: 'terrain', id},
  //           })
  //         }
  //       />
  //     </View>
  //     <ImageView
  //       images={terrainInfo.images.map(im => ({uri: im}))}
  //       imageIndex={0}
  //       visible={visible}
  //       onRequestClose={() => setVisible(false)}
  //     />
  //   </View>
  // );

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 2, paddingHorizontal: RFPercentage(4)}}>
        <View style={{flex: 0.5, alignItems: 'center'}}>
          <Text style={{fontSize: RFPercentage(5)}}>{terrainInfo.title}</Text>
        </View>
        <View style={{flex: 1, paddingBottom: RFPercentage(2)}}>
          <TouchableHighlight onPress={() => setVisible(true)}>
            <Image
              source={{uri: terrainInfo.images[0]}}
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
          <Text> </Text>
          <Text>{terrainInfo.surface}</Text>
          <Text>{terrainInfo.address}</Text>
          <Text>{terrainInfo.services}</Text>
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
                screen: 'MessageScreen',
                params: {name: 'Nombre', from: 'terrain', id},
              })
            }
          />
        </View>
      </View>
      <ImageView
        images={terrainInfo.images.map(im => ({uri: im}))}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};

export default TerrainScreen;
