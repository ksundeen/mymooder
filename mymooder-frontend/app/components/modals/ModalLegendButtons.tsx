

import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet, Image, Modal, Alert, Pressable } from 'react-native';
import { Colors } from '../../constants/Colors';

const {height, width} = Dimensions.get("window");              

export function ModalLegendButtons({setRecenterMapCaller, clusterIconsVisible, setClusterIconsVisibleCaller}:
  {setRecenterMapCaller: Function, clusterIconsVisible: boolean, setClusterIconsVisibleCaller: Function}
) {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [_, showOpenButton] = useState<boolean>(true);
    const [clusterButtonText, setClusterButtonText] = useState<string>('Uncluster Icons');
    const [pressedInCluster, setPressedInCluster] = useState<boolean>(false);
    const [pressedInCenter, setPressedInCenter] = useState<boolean>(false);

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
                    style={[styles.modalButtonLocation, styles.buttonColor]}
                    onPress={() => {setModalVisible(!modalVisible); showOpenButton(!modalVisible)}}>
                    <Text style={styles.buttonTextStyle}>Hide Legend</Text>
                  <Image
                      style={styles.legendImage}
                      source={require('../../../assets/images/map-legend.png')}
                  />
                  </Pressable>
              </View>
        </Modal>
        <View style={styles.buttonRow}>
            {
              modalVisible ? <></> :
                  <Pressable
                  style={[styles.button, styles.legendButtonLocation, styles.buttonColor]}
                  onPress={() => {setModalVisible(true); showOpenButton(!modalVisible)}}>
                  <Text style={[styles.buttonTextStyle, styles.buttonTextStyle, styles.buttonTextStyle]}>Legend</Text>
                  </Pressable>
            }
            <Pressable
                style={pressedInCluster ? 
                    [styles.button, styles.buttonClusterIconsLocation, styles.buttonColorPressedIn] 
                    : 
                    [styles.button, styles.buttonClusterIconsLocation, styles.buttonColor]
                  }
                onPress={() => {
                    setClusterIconsVisibleCaller(!clusterIconsVisible); 
                    if (clusterIconsVisible) {
                    setClusterButtonText('Uncluster Icons');
                    } else {
                    setClusterButtonText('Cluster Icons');
                    }
                } }
                onPressIn={() => setPressedInCluster(true)}
                onPressOut={() => setPressedInCluster(false)}
                >
                <Text style={styles.buttonTextStyle}>{clusterButtonText}</Text>
            </Pressable>
            <Pressable
                style={pressedInCenter ? 
                  [styles.button, styles.buttonCenterLocation, styles.buttonColorPressedIn] 
                  : 
                  [styles.buttonColor, styles.buttonCenterLocation, styles.button]
                }
                onPress={() => setRecenterMapCaller(true)}
                onPressIn={() => setPressedInCenter(true)}
                onPressOut={() => setPressedInCenter(false)}
                >
                <Text style={styles.buttonTextStyle}>Recenter</Text>
            </Pressable>
          </View>
        </View>
        )
};

export default ModalLegendButtons;

const styles = StyleSheet.create({
  container: {
     flex: 0.003,
     alignItems: 'center',
     justifyContent: 'center',
  },
  legendImage:{
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
    marginBottom: 11,
    textAlign: 'center',
  },
  buttonRow: {
    marginHorizontal: "auto",
    flexDirection: "row"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 3,
    position: 'absolute',
    alignContent: 'center',
    height: 50,
    width: width/3.5,
    bottom: -61,
    },
  modalButtonLocation: {
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    position: 'absolute'
  },
  legendButtonLocation: {
    // left: "15%",
    right: (width/5) - (width/1.5)
  },
  buttonClusterIconsLocation: {
    // right: "20%",
    left: (width/5) - (width/1.5)
  },
  buttonCenterLocation: {
    left: (width/5) - (width/2.9)
  },
  buttonColor: {
    backgroundColor: Colors.lightBlue,
  },
  buttonColorPressedIn: {
    backgroundColor: Colors.lightGrey,
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    top: "23%",
    fontSize: 13,
  },
});