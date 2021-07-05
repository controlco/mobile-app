import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, Button, Alert} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import RadioButtonRN from 'radio-buttons-react-native';
//import {store} from '../../../../redux/store';
import axios from 'axios';

LocaleConfig.locales.es = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'en.',
    'febr.',
    'mzo.',
    'abr.',
    'my.',
    'jun.',
    'jul.',
    'agt.',
    'sept.',
    'oct.',
    'nov.',
    'dic.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

const auxDateDic = {
  9: '09:00 - 10:00',
  10: '10:00 - 11:00',
  11: '11:00 - 12:00',
  12: '12:00 - 13:00',
  13: '13:00 - 14:00',
  14: '14:00 - 15:00',
};

const CalendarScreen = ({route, navigation}) => {
  //const {id} = route.params;
  const id = 1;
  const [markedDates, setMarkedDates] = useState({});
  const [dataAvailable, setDataAvailable] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState({
    date: '',
    time: '',
    hour: 0,
  });
  const [unavailable, setUnavailable] = useState({});
  const btnRef = React.createRef();
  const [disabledBtn, setDisabledBtn] = useState(true);
  //const state = store.getState();
  const state = {
    userToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InVzZXJAdWMuY2wiLCJleHAiOjE2MjgwODczMTcsImVtYWlsIjoidXNlckB1Yy5jbCJ9.dStw977YR7iqyF_QtV0BAnB20ZPSebsVqXIXaQjzmc4',
  };
  const path = `https://desarrollosoftware.tk/properties/${id}/meetings/`;
  const headers = {
    Authorization: `Bearer ${state.userToken}`,
    'Content-Type': 'application/json',
  };
  const [loading, setLoading] = useState(true);

  const getMarkedDates = () => {
    var currentTime = new Date();
    var auxDic;
    for (var i = 0; i < 14; i++) {
      currentTime.setDate(currentTime.getDate() + 1);
      auxDic =
        currentTime.getDay() === 0 || currentTime.getDay() === 6
          ? auxDic
          : {
              ...auxDic,
              [getFormatDate(currentTime)]: {
                disabled: false,
                disableTouchEvent: false,
              },
            };
    }
    setMarkedDates(auxDic);
    let auxValues = unavailable;
    axios
      .get(path, {})
      .then(function (response) {
        response.data.forEach(meeting => {
          const auxList = auxValues[meeting.date] || [];
          if (!auxList.includes(meeting.hour)) {
            auxList.push(meeting.hour);
          }
          auxValues = {...auxValues, [meeting.date]: auxList};
        });
        setLoading(false);
        setUnavailable(auxValues);
      })
      .catch(function (error) {
        Alert.alert('Error', 'Ha ocurrido un error, intenta nuevamente.');
      });
  };

  const updateAvailableHours = () => {
    var auxData = [];
    Object.keys(auxDateDic).forEach(data => {
      if (unavailable[selectedMeeting.date]) {
        if (!unavailable[selectedMeeting.date].includes(parseInt(data))) {
          auxData = [...auxData, {label: auxDateDic[data], value: data}];
        }
      } else {
        auxData = [...auxData, {label: auxDateDic[data], value: data}];
      }
    });
    setDataAvailable(auxData);
  };
  const getFormatDate = date => {
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const setSelectedDay = day => {
    if (markedDates[selectedMeeting.date]) {
      markedDates[selectedMeeting.date] = {
        ...markedDates[selectedMeeting.date],
        selected: false,
        disableTouchEvent: false,
      };
    }
    const newMark = {
      ...markedDates,
      [day]: {disabled: false, disableTouchEvent: true, selected: true},
    };
    setMarkedDates(newMark);
    setSelectedMeeting({...selectedMeeting, date: day});
  };

  const setMeeting = e => {
    setSelectedMeeting({...selectedMeeting, time: e.label, hour: e.value});
    setDisabledBtn(false);
  };

  const confirmMeeting = () => {
    axios
      .post(
        path,
        {
          date: selectedMeeting.date,
          hour: selectedMeeting.hour,
        },
        {headers},
      )
      .then(function (response) {
        console.log(response.data);
        Alert.alert('', 'La hora se ha agendado con éxito!');
        navigation.navigate('HomePageScreen');
      })
      .catch(function (error) {
        console.log(error.message);
        Alert.alert('Error', 'Ha ocurrido un error, intenta nuevamente.');
      });
  };

  const reserveMeeting = () => {
    Alert.alert(
      'Información Cita',
      `Día: ${selectedMeeting.date}\nHorario: ${selectedMeeting.time}`,
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          onPress: () => confirmMeeting(),
          style: 'cancel',
        },
      ],
    );
  };

  useEffect(() => {
    if (loading) {
      getMarkedDates();
    } else {
      updateAvailableHours();
    }
  }, [selectedMeeting]);

  return (
    <View style={styles.container}>
      <Text style={styles.inputText}>
        Selecciona una fecha para tu visita:{' '}
      </Text>
      <Calendar
        firstDay={1}
        minDate={'2021-06-21'}
        disabledByDefault={true}
        disableAllTouchEventsForDisabledDays={true}
        hideExtraDays={true}
        markedDates={markedDates}
        onDayPress={day => {
          setSelectedDay(day.dateString);
        }}
        style={styles.calendar}
        theme={{
          textSectionTitleColor: '#b6c1cd',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 15,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 15,
        }}
      />
      <Text style={styles.inputText}>
        Selecciona un horario para tu visita:{' '}
      </Text>
      <ScrollView style={styles.scrollView}>
        <RadioButtonRN
          ref={btnRef}
          data={dataAvailable}
          selectedBtn={e => setMeeting(e)}
          style={styles.radioButton}
          box={false}
          circleSize={10}
        />
      </ScrollView>
      <Button
        disabled={disabledBtn}
        title="Agendar Visita"
        onPress={() => reserveMeeting()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    margin: 'auto',
  },
  scrollView: {
    width: '90%',
    maxHeight: 150,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  inputText: {
    padding: 5,
    alignSelf: 'flex-start',
    fontSize: 15,
  },
});

export default CalendarScreen;
