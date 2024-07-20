

import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Modal, Alert, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';

export function ModalComponent({clusterIconsVisible, setClusterIconsVisibleCaller}:
  {clusterIconsVisible: boolean, setClusterIconsVisibleCaller: Function}
) {

    const [modalVisible, setModalVisible] = useState(false);
    const [_, showOpenButton] = useState(true);
    const [clusterButtonText, setClusterButtonText] = useState<string>('Uncluster Icons');
    const [pressedIn, setPressedIn] = useState<boolean>(false);

    return (
      <View style={styles.container}>
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
              <View style={styles.modalView}>
                  <Text style={styles.modalText}>Legend</Text>
                  <Pressable
                    style={[styles.modalButton, styles.legendButtonClose]}
                    onPress={() => {setModalVisible(!modalVisible); showOpenButton(!modalVisible)}}>
                    <Text style={styles.textStyle}>Hide Legend</Text>
                  <Image
                      style={styles.legend}
                      source={require('../../assets/images/map-legend.png')}
                  />
                  <Text style={styles.smallModalText}>~tap to close~</Text>
                  </Pressable>
              </View>
        </Modal>
        <View style={styles.buttonRow}>
            {modalVisible ? <></> :
                <Pressable
                style={[styles.legendButton, styles.legendButtonOpen]}
                onPress={() => {setModalVisible(true); showOpenButton(!modalVisible)}}>
                <Text style={[styles.textStyle, styles.legendButtonText]}>Legend</Text>
                </Pressable>
            }
            <Pressable
                style={pressedIn ? [styles.clusterButton, styles.clusterButtonColorPressedIn] : [styles.clusterButtonColor, styles.clusterButton]}
                onPress={() => {
                    setClusterIconsVisibleCaller(!clusterIconsVisible); 
                    if (clusterIconsVisible) {
                    setClusterButtonText('Uncluster Icons');
                    } else {
                    setClusterButtonText('Cluster Icons');
                    }
                } }
                onPressIn={() => setPressedIn(true)}
                onPressOut={() => setPressedIn(false)}
                >
                <Text style={styles.clusterButtonsTextStyle}>{clusterButtonText}</Text>
            </Pressable>
          </View>
        </View>
        )
};

export default ModalComponent;

const styles = StyleSheet.create({
  container: {
     flex: 0.003,
     alignItems: 'center',
     justifyContent: 'center',
  },
  legend:{
    height: 300,
    width: 375,
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
    marginBottom: 12,
    textAlign: 'center',
  },
  legendButtonText: {
    fontSize: 14,
    top: "15%",
  },
  smallModalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 10
  },
  buttonRow: {
    flex: 0.07,
    marginHorizontal: "auto",
    flexDirection: "row"
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute'
  },
  legendButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 3,
    position: 'absolute',
    bottom: -61,
    height: 50,
    left: "15%",
    width: 140
  },
  legendButtonClose: {
    backgroundColor: Colors.lightBlue
  },
  legendButtonOpen: {
    backgroundColor: Colors.lightBlue
  },
  clusterButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 3,
    position: 'absolute',
    bottom: -61,
    right: "15%",
    height: 50,
    width: 140,
    alignContent: 'center'
  },
  clusterButtonColor: {
    backgroundColor: Colors.lightBlue,
  },
  clusterButtonColorPressedIn: {
    backgroundColor: Colors.lightGrey,
  },
  clusterButtonsTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    top: "23%",
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});