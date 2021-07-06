import React, {useState} from 'react';
import {View, Text, Button, TouchableHighlight, Image} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import ImageView from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/Ionicons';
import {showLocation} from 'react-native-map-link';
import {DotIndicator} from 'react-native-indicators';
import axios from 'axios';
import {store} from '../../../../redux/store';
import jwt_decode from 'jwt-decode';

const TerrainScreen = ({route, navigation}) => {
  const {id, terrain} = route.params;
  const state = store.getState();
  const userData = jwt_decode(state.userToken);
  const backendImages = 'https://desarrollosoftware.tk';
  const firstImage = terrain.property_images.length
    ? backendImages + terrain.property_images[0].cover
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAY4UUVKjiP3MjXyNxAW3FC5CddlG2YLFP31nvwQsN8_aww6DmWTHzdoZd2rvBE_3YlOY&usqp=CAU';

  let loaded = true;
  const terrainInfo = terrain;

  const [messages, setMessages] = useState([]);

  const [visible, setVisible] = useState(false);

  const updateMessages = async () => {
    const backUrl = `https://desarrollosoftware.tk/users/${terrainInfo.owner_id}/messages/`;
    axios
      .get(backUrl, {headers: {Authorization: `Bearer ${state.userToken}`}})
      .then(response => {
        return response.data;
      })
      .catch(error => {
        alert(error);
      });
  };

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
            paddingVertical: RFPercentage(1),
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
            paddingVertical: RFPercentage(1),
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
            onPress={() => {
              const backUrl = `https://desarrollosoftware.tk/users/${terrainInfo.owner_id}/messages/`;
              axios
                .get(backUrl, {
                  headers: {Authorization: `Bearer ${state.userToken}`},
                })
                .then(response => {
                  return response.data;
                })
                .then(messagesResp => {
                  console.log(messagesResp);
                  navigation.navigate('MessageStackScreens', {
                    screen: 'MessageScreen',
                    params: {
                      name: terrainInfo.owner,
                      owner_id: terrainInfo.owner_id,
                      initialMessages: messagesResp,
                      change: true,
                    },
                  });
                })
                .catch(error => {
                  alert(error);
                });
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: RFPercentage(1),
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: RFPercentage(1),
            alignItems: 'center',
          }}>
          <Icon
            name="warning"
            color={'black'}
            size={26}
            style={{marginRight: RFPercentage(2)}}
          />
          <Button
            title="Reportar"
            onPress={() =>
              navigation.navigate('ReportScreen', {
                owner_id: terrainInfo.owner_id,
                name: terrainInfo.owner,
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
