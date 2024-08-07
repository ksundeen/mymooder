

import { Text, View, StyleSheet, Modal, Alert } from 'react-native';
import ButtonComponent from '../ButtonComponent';

export function ModalDeletedData({showModal, setShowModalCaller}:
  {showModal: boolean, setShowModalCaller: Function}
) {

    return (
      <View style={styles.container}>
        <Modal
            animationType='fade'
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setShowModalCaller(false);
            }}>
              <View style={[styles.modalView]}>
                <Text style={styles.modalText}>Data deleted!</Text>
                <ButtonComponent extraStyles={{bottom: "-150%"}} buttonWidth={75} onPress={() => setShowModalCaller(false)} text='Close'/>
              </View>
        </Modal>
        </View>
        )
};

export default ModalDeletedData;

const styles = StyleSheet.create({
  container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 75,
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
    fontSize: 20,
    marginTop: "-8%",
  },
});