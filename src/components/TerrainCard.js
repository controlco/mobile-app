import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import {Card} from 'react-native-elements';
import ImageView from 'react-native-image-viewing';

const TerrainCard = params => {
  const backendImages = 'https://desarrollosoftware.tk';
  const terrain = params.terrain;
  console.log(terrain);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const images = terrain.property_images.map(im => ({
    uri: backendImages + im.cover,
  }));
  const firstImage = terrain.property_images.length
    ? backendImages + terrain.property_images[0].cover
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAY4UUVKjiP3MjXyNxAW3FC5CddlG2YLFP31nvwQsN8_aww6DmWTHzdoZd2rvBE_3YlOY&usqp=CAU';
  return (
    <Card>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 2}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TerrainScreen', {
                id: terrain.id,
                terrain,
              });
            }}>
            <Text>{terrain.title}</Text>
            <Text>{terrain.surface} Hectareas</Text>
            <Text>{terrain.address}</Text>
            <Text>${terrain.price}</Text>
            <Text>{terrain.owner}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Image
              source={{uri: firstImage}}
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </Card>
  );
};
export default TerrainCard;
