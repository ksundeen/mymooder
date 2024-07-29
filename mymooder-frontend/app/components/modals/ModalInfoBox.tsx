

import { Text, View, StyleSheet, Modal, Alert } from 'react-native';
import { MoodValue, LocationValues } from '@/app/database/types';
import ButtonComponent from '../ButtonComponent';
import { convertIsoToLocaleString } from '../../helpers';

export function ModalInfoBox({locationValues, 
                              moodValue,
                              showInfoBoxModal, 
                              setShowInfoBoxModalCaller, 
                              setLocationsFromMapToMoodCaller
}:
  {locationValues: LocationValues | null, 
    moodValue: MoodValue | null, 
    showInfoBoxModal: boolean, 
    setShowInfoBoxModalCaller: Function, 
    setLocationsFromMapToMoodCaller: Function,
  }
) {
    const sendLocationsYes = (locationValues: LocationValues) => {
      setLocationsFromMapToMoodCaller(locationValues)
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
              setLocationsFromMapToMoodCaller(null);
            }}>
              <View style={[styles.modalView]}>
              {moodValue ? 
                <View style={[styles.infoBoxText]}>
                  <Text>Name: {moodValue.name}</Text>
                  <Text>Latitude: {moodValue.latitude_x}, Longitude: {moodValue.longitude_y}</Text>
                  <Text>Datetime: {convertIsoToLocaleString(moodValue.datetime)}</Text>
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
              {locationValues ? 
                <View style={[styles.infoBoxText]}>
                  <Text>Latitude: {locationValues.latitude}</Text>
                  <Text>Longitude: {locationValues.longitude}</Text>
                  </View>
                :
                <></>
              }
                <Text style={styles.modalText}>Send these coordinates to the Mood Screen?</Text>
                <View style={styles.buttonRow}>
                  <ButtonComponent buttonWidth={75} onPress={() => sendLocationsYes(locationValues)} text='Yes'/>
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