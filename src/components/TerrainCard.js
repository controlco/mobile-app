import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import {Card} from 'react-native-elements';
import ImageView from 'react-native-image-viewing';

const TerrainCard = params => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const images = params.images.map(im => ({uri: im}));
  return (
    <Card>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 2}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TerrainScreen', {
                id: params.id,
              });
            }}>
            <Text>{params.title}</Text>
            <Text>{params.surface} Hectareas</Text>
            <Text>{params.address}</Text>
            <Text>${params.price}</Text>
            <Text>{params.owner}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Image
              source={{uri: params.images[0]}}
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
