

import { Text, View, StyleSheet, Modal, Alert } from 'react-native';
// import { Colors } from '../../constants/Colors';
import { MoodValue, LocationValues, defaultLocationValues, defaultMoodValue } from '@/app/database/interfaces/interfaces';
import ButtonComponent from '../ButtonComponent';

export function ModalInfoBox({locationValues, moodValue, showInfoBoxModal, setShowInfoBoxModalCaller, setShouldSendLocationToMoodCaller}:
  {locationValues: LocationValues, moodValue: MoodValue, showInfoBoxModal: boolean, setShowInfoBoxModalCaller: Function, setShouldSendLocationToMoodCaller: Function}
) {
    const sendLocationsYes = () => {
      setShouldSendLocationToMoodCaller(true)
      setShowInfoBoxModalCaller(false)
    };

    return (
      <View style={styles.container}>
        <Modal
            animationType='fade'
            transparent={true}
            visible={showInfoBoxModal}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setShowInfoBoxModalCaller(false);
              setShouldSendLocationToMoodCaller(false);
            }}>
              <View style={[styles.modalView]}>
              {moodValue && moodValue != defaultMoodValue ? 
                <View style={[styles.infoBoxText]}>
                  <Text>Name: {moodValue.name}</Text>
                  <Text>Latitude: {moodValue.latitude_x}, Longitude: {moodValue.longitude_y}</Text>
                  <Text>Datetime: {moodValue.datetime}</Text>
                  <Text>Calmness Score: {moodValue.calmness_score}</Text>
                  <Text>Happy Score: {moodValue.happy_score}</Text>
                  <Text>People: {moodValue.people}</Text>
                  <Text>Activities: {moodValue.activities}</Text>
                  <Text>Weather: {moodValue.personal_weather_rating}</Text>
                  <Text>Monitored Weather: {moodValue.api_weather_rating}</Text>
                  <Text>Monitored Temp: {moodValue.api_weather_temperature}</Text>
                  <Text>Notes: {moodValue.notes}</Text>
                </View>
                :
                <></>
              }
              {locationValues && locationValues != defaultLocationValues ? 
                <View style={[styles.infoBoxText]}>
                  <Text>Latitude: {moodValue.latitude_x}, Longitude: {moodValue.longitude_y}</Text>
                </View>
                :
                <></>
              }
                <Text style={styles.modalText}>Send these coordinates to the Mood Screen?</Text>
                <View style={styles.buttonRow}>
                  <ButtonComponent buttonWidth={75} onPress={() => sendLocationsYes()} text='Yes'/>
                  <ButtonComponent buttonWidth={75} onPress={() => setShowInfoBoxModalCaller(false)} text='Close'/>
                </View>
              </View>
        </Modal>
        </View>
        )
};

export default ModalInfoBox;

const styles = StyleSheet.create({
  container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
  },
  infoBoxText: {
      fontSize: 12,
      // padding: 5,
      // margin: 5,
      // textAlign: 'left',
      left: "1%",
  },
  buttonRow: {
    flex: 1,
    marginHorizontal: "auto",
    flexDirection: "row",
    padding: 20
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    top: "30%",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: "10%",
  },
});