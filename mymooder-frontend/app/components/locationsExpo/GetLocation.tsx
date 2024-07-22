import { useState } from "react";
import * as Location from "expo-location";
import { View, Text, StyleSheet, TextInput, Linking } from "react-native";
import ButtonComponent from "../ButtonComponent";

export function GetLocation(props: {
    onDataReceivedCaller: Function, 
    parentClearState: boolean, 
    setParentShouldClearState: Function}
) {

    const { onDataReceivedCaller, parentClearState, setParentShouldClearState } = props;

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

    const [userLocation, setUserLocation] = useState(defaultPosition);
    const [userLocationTextLat, setUserLocationTextLat] = useState('');
    const [userLocationTextLong, setUserLocationTextLong] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [latitudeNumber, onChangeLatitude] = useState<string>('');
    const [longitudeNumber, onChangeLongitude] = useState<string>('');
    const [showCoordinateEntry, setShowCoordinateEntry] = useState<boolean>(false);

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
        setUserLocationTextLat('')
        setUserLocationTextLong('')
        setUserLocation(defaultPosition)
        setErrorMsg('')
        setParentShouldClearState(false)
        onDataReceivedCaller({
            latitude: 0,
            longitude: 0
        })
        };
        
    if (parentClearState && userLocation != defaultPosition && userLocationTextLat != '' && userLocationTextLong != '') {
        clearLocation()
    };

    const defaultLoadingText = 'Loading...';

    const requestPermissionsAndLocation = async () => {
        let _userLocationTextLat = defaultLoadingText
        let _userLocationTextLong = defaultLoadingText
        setUserLocationTextLat(defaultLoadingText)
        setUserLocationTextLong(defaultLoadingText)

        while (_userLocationTextLat === defaultLoadingText || _userLocationTextLong === defaultLoadingText){
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
                _userLocationTextLat = _errMsg
                setUserLocationTextLat(_errMsg)
                setUserLocationTextLong(_errMsg)
            } else if (_userLocation !== defaultPosition) {
                setUserLocation(_userLocation)
                // Send locations to parent component to save
                onDataReceivedCaller({
                    latitude: _userLocation.coords.latitude,
                    longitude: _userLocation.coords.longitude
                })
                _userLocationTextLat = (Math.round(_userLocation.coords.latitude * 100) / 100).toFixed(3)
                _userLocationTextLong = (Math.round(_userLocation.coords.longitude * 100) / 100).toFixed(3)
            } else {
                _userLocationTextLat = 'Still Loading...'
                _userLocationTextLong = 'Still Loading...'
            }; 
            setUserLocationTextLat(_userLocationTextLat)
            setUserLocationTextLong(_userLocationTextLong)
            setUserLocation(_userLocation)
            console.log(`Location lat, long: ${_userLocationTextLat}, ${_userLocationTextLong}`)
        };
    };

    // const MapScreen = ({navigation}) => {
    //     return (
    //       <Button
    //         title="Go to Jane's profile"
    //         onPress={() =>
    //           navigation.navigate('Profile', {name: 'Jane'})
    //         }
    //       />
    //     );
    //   };

    return (
        <>
                <Text style={styles.paragraphLeft}>1. Either enter latitude and longitude coordinates directly with the button below.</Text>
            <View style={styles.container}>
                { (userLocationTextLat === '' || userLocationTextLong === '') ?
                    <ButtonComponent buttonWidth={150} onPress={() => requestPermissionsAndLocation()} text='Request Location'/>
                    :
                    <View style={styles.paragraph}>
                        <Text>Latitude: {userLocationTextLat}</Text>
                        <Text style={styles.textParagraph}>Longitude: {userLocationTextLong}</Text>
                        <ButtonComponent buttonWidth={75} onPress={() => clearLocation()} text='Reset'/>
                    </View>
                }
            </View>
                <Text style={styles.paragraphLeft}>2. Or get the locations from the map. Open the Map...Click on location on map...Click button "Send to Mood"</Text>
                <Text style={styles.paragraphLeft}>3. Or enter latitude and longitude coordinates directly with the button below.</Text>
            <View style={styles.container}>
            <ButtonComponent buttonWidth={150} onPress={() => setShowCoordinateEntry(!showCoordinateEntry)} text='Enter Coordinates Manually'/>
            {showCoordinateEntry ? 
                <View style={styles.buttonRow}>
                    <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeLatitude}
                    value={latitudeNumber}
                    placeholder="Enter Latitude"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeLongitude}
                    value={longitudeNumber}
                    placeholder="Enter Longitude"
                    keyboardType="numeric"
                />
                </View>
                : <></>
            }

            </View>
            <View style={styles.container}>
                <ButtonComponent buttonWidth={150} onPress={() => sendLocation()} text='Open in Google Maps'/>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      paddingBottom: 25,
    },
    paragraphLeft: {
        fontSize: 12,
        padding: 5,
        margin: 5,
        textAlign: 'left',
    },
    paragraph: {
      fontSize: 12,
      padding: 5,
      margin: 5,
      textAlign: 'center',
    },
    buttonRow: {
        flex: 0.07,
        padding: 10,
        marginHorizontal: "auto",
        flexDirection: "row"
    },
    textParagraph: {
        paddingBottom: 10,
        paddingRight: 10,
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });

export default GetLocation;