import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import * as Location from 'expo-location';

export function GetLocation() {
  const defaultPosition: Geolocation.GeoPosition = {
    coords: {
        latitude: 0, //43.233224,
        longitude: 0, //-89.346395,
        accuracy: 0,
        altitude: 0,
        heading: 0,
        speed: 0
    },
    timestamp: 0
  }

  const [location, setLocation] = useState(defaultPosition);
  const [errorMsg, setErrorMsg] = useState('');


  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location: Location.LocationObject = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default GetLocation;