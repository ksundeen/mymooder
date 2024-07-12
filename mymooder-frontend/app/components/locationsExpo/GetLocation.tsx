import { useState } from "react";
import * as Location from "expo-location";
import { View, Text, StyleSheet, Button, Linking } from "react-native";

export function GetLocation() {
    const defaultPosition: Location.LocationObject = {
        coords: {
            latitude: 0, //43.233224,
            longitude: 0, //-89.346395,
            accuracy: 0,
            altitude: 0,
            heading: 0,
            speed: 0,
            altitudeAccuracy: 0
        },
            timestamp: 0
    };

    const defaultLoadingText = 'Loading...';

    const [userLocation, setUserLocation] = useState(defaultPosition);
    const [userLocationText, setUserLocationText] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Function to Send Location to twitter
    const sendLocation = () => {
        // Will be sending to the leaflet map and d3 map
        try {
            if (userLocation !== defaultPosition && userLocation !== null) {
            // const tweet = `latitude is ${location.coords.latitude} and longitude is ${location.coords.longitude}`;
            // const url = `https://twitter.com/intent/tweet?text=${tweet}`;
            const googleMapsUrl = `https://maps.google.com/?q=${userLocation.coords.latitude},${userLocation.coords.longitude}`
            Linking.openURL(googleMapsUrl);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const clearLocation = () => {
        setUserLocationText('')
    }

    const requestPermissions = async () => {
        let _userLocationText = defaultLoadingText

        while (_userLocationText === defaultLoadingText){
            let _errMsg = errorMsg
            let _userLocation = defaultPosition
            
            // Possible values: {"GRANTED":"granted","UNDETERMINED":"undetermined","DENIED":"denied"}
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                _errMsg = 'Permission to access location was denied'
            }
            console.log(`Location Status: ${status.toString()}`)
            _userLocation = await Location.getCurrentPositionAsync({})
            setUserLocation(_userLocation)
    
            if (_errMsg !== '') {
                setErrorMsg(_errMsg)
                setUserLocationText(_errMsg)
                _userLocationText = _errMsg
            } else if (_userLocation !== defaultPosition) {
                setUserLocation(_userLocation)
                _userLocationText = JSON.stringify(_userLocation, null, 4)
                setUserLocationText(_userLocationText)
            } else {
                _userLocationText = 'Still Loading. Request Again.'
                setUserLocationText(_userLocationText)
            }; 
            console.log(`Location Status: ${_userLocationText}`)
        };

    };

    return (
        <View>
            { userLocationText === '' ?
                <Button title="Request Location" onPress={requestPermissions}/>
                :
                <View>
                    <Text style={styles.paragraph}>{userLocationText}</Text>
                    <Button title="Reset" onPress={clearLocation}/>
                </View>
            }
            <Button title="Send Location" onPress={sendLocation} />
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    paragraph: {
      fontSize: 12,
      textAlign: 'center',
    },
  });

export default GetLocation;