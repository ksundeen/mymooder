import { GetCurrentLocationNonExpo } from '@/components/locationsNonExpo/GetCurrentPositionNonExpo';
import { SetConfigurations } from '@/components/locationsNonExpo/SetLocationConfigurations';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Linking,
  Platform,
} from 'react-native';
import Geolocation, { GeolocationConfiguration } from '@react-native-community/geolocation';


interface userPosition {
    coords: {
        latitude: number,
        longitude: number,
        accuracy: number,
        altitude: number,
        heading: number,
        speed: number,
    },
    timestamp: number
}

// state to hold location for DeForest, WI
const defaultPosition: userPosition = {
    coords: {
        latitude: 0, //43.233224,
        longitude: 0, //-89.346395,
        accuracy: 0,
        altitude: 0,
        heading: 0,
        speed: 0
    },
    timestamp: Date.now()
}

let granted = 'undetermined'; // 'denied' or 'granted'

// Function to get permission for location
const requestLocationPermission = async () => {
    try {

        if (Platform.OS === 'android') {
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'May we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
        } else if (Platform.OS === 'ios') {
            granted = await Permissions.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'May we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
        }

        console.log('granted', granted);

        if (granted === 'granted') {
            console.log('You can use Geolocation');
            return true;
        } else {
            console.log('You cannot use Geolocation');
            return false;
        }

    } catch (err) {
        console.log(err)
        return false;
    }
};

// React.JSX.Element
export const GetLocation = () => {
    const locationsConfig: GeolocationConfiguration = {
        skipPermissionRequests: false,
        authorizationLevel: 'always',
        enableBackgroundLocationUpdates: true,
        locationProvider: 'auto'
    }

    // Set configs for requesting permissions
    Geolocation.setRNConfiguration(locationsConfig)

    // Request authorization
    const requestAuthorization = () => {
        Geolocation.requestAuthorization();
      };

    const [location, setLocation] = useState(defaultPosition);
    
    // function to check permissions and get Location
    const getUserLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {
        console.log('Can we access geolocation?', res);
        if (res) {
            Geolocation.getCurrentPosition(
            position => {
                console.log(position);
                setLocation(position);
            },
            error => {
                // See error code charts below.
                console.log(error.code, error.message);
                setLocation(defaultPosition);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
        }
        });
        console.log(location);
    };

  // Function to Send Location to twitter
  const sendLocation = () => {
    // Will be sending to the leaflet map and d3 map
    try {
      if (location) {
        // const tweet = `latitude is ${location.coords.latitude} and longitude is ${location.coords.longitude}`;
        // const url = `https://twitter.com/intent/tweet?text=${tweet}`;
        const googleMapsUrl = `https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`
        Linking.openURL(googleMapsUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
        <View
            style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
            <Button title="Request Permission" onPress={requestAuthorization} />
        </View>
        <View>
            <SetConfigurations/>
        </View>
        <View>
            <GetCurrentLocationNonExpo/>
        </View>
        <View
            style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
            <Button title="Send Location" onPress={sendLocation} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GetLocation;