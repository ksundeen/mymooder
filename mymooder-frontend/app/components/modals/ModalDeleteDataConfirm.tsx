

import { Text, View, StyleSheet, Modal, Alert } from 'react-native';
import ButtonComponent from '../ButtonComponent';

export function ModalDeleteDataConfirm({setShouldDeleteDataCaller, showModal, setShowModalCaller}:
  {setShouldDeleteDataCaller: Function, showModal: boolean, setShowModalCaller: Function}
) {
    const sendDeleteYesOrNO = (state: boolean) => {
      setShouldDeleteDataCaller(state)
      setShowModalCaller(false)
    };

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
                <Text style={styles.modalText}>Are you sure you want to delete all your data?</Text>
                <View style={styles.buttonRow}>
                  <ButtonComponent buttonWidth={75} onPress={() => sendDeleteYesOrNO(true)} text='Yes'/>
                  <ButtonComponent buttonWidth={75} onPress={() => sendDeleteYesOrNO(false)} text='No'/>
                </View>
              </View>
        </Modal>
        </View>
        )
};

export default ModalDeleteDataConfirm;

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