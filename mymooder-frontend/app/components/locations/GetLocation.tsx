import { useState } from "react";
import * as Location from "expo-location";
import { View, Text, StyleSheet, TextInput, Linking } from "react-native";
import ButtonComponent from "../ButtonComponent";
import { LocationValues } from "@/app/database/types";
import { requestPermissionsAndLocationAsync } from "@/app/utils/RequestPermissionsAndLocationAsync"

export function GetLocation(props: {
    locationsFromMap: LocationValues | null
    onDataReceivedCaller: Function, 
    parentClearState: boolean, 
    setParentShouldClearState: Function}
) {

    const { locationsFromMap, onDataReceivedCaller, parentClearState, setParentShouldClearState } = props;

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

    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
    const [userLocationTextLat, setUserLocationTextLat] = useState<string>('');
    const [userLocationTextLong, setUserLocationTextLong] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [latitudeNumber, onChangeLatitude] = useState<string>('');
    const [longitudeNumber, onChangeLongitude] = useState<string>('');
    const [showCoordinateEntry, setShowCoordinateEntry] = useState<boolean>(false);

    // Function to Send Location to Google Maps browser
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

    const requestLocation = async () => {
        await requestPermissionsAndLocationAsync(    
            defaultPosition,
            setUserLocationTextLat,
            setUserLocationTextLong,
            errorMsg,
            setErrorMsg,
            setUserLocation,
            onDataReceivedCaller
        )
    };

    return (
        <>
            <Text style={styles.paragraphLeft}>1. Either enter latitude and longitude coordinates directly with the button below.</Text>
            <View style={styles.container}>
                { (userLocationTextLat === '' || userLocationTextLong === '') ?
                    <ButtonComponent buttonWidth={150} onPress={async () => await requestLocation()} text='Request Location'/>
                    :
                    <View style={styles.paragraph}>
                        <Text>Latitude: {userLocationTextLat}</Text>
                        <Text style={styles.textParagraph}>Longitude: {userLocationTextLong}</Text>
                        <ButtonComponent buttonWidth={75} onPress={() => clearLocation()} text='Reset'/>
                    </View>
                }
            </View>
                <Text style={styles.paragraphLeft}>2. Or get the locations from the map. Open the Map...Click on location on map...Click button "Send to Mood"</Text>
                <Text style={styles.paragraphLeft}>3. Or enter latitude and longitude coordinates directly with the button below. 
                    (If you sent map locations here, they will show up in the text boxes below.)</Text>
            <View style={styles.container}>
            <ButtonComponent buttonWidth={150} onPress={() => setShowCoordinateEntry(!showCoordinateEntry)} text='Enter Coordinates Manually'/>
            {(showCoordinateEntry || locationsFromMap) ? 
                <View style={styles.buttonRow}>
                    <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeLatitude}
                    value={locationsFromMap ? String(locationsFromMap.latitude) : latitudeNumber}
                    placeholder="Enter Latitude"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeLongitude}
                    value={locationsFromMap ? String(locationsFromMap.longitude) : longitudeNumber}
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