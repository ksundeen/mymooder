import * as Location from "expo-location";

export const requestPermissionsAndLocationAsync = async (
    defaultPosition: Location.LocationObject,
    setUserLocationTextLatCaller: Function,
    setUserLocationTextLongCaller: Function,
    errorMsgState: string,
    setErrorMsgCaller: Function,
    setUserLocationCaller: Function,
    onDataReceivedCaller: Function | null
) => {
    const defaultLoadingText = 'Loading...';

    let _userLocationTextLat = defaultLoadingText
    let _userLocationTextLong = defaultLoadingText
    setUserLocationTextLatCaller(defaultLoadingText)
    setUserLocationTextLongCaller(defaultLoadingText)

    while (_userLocationTextLat === defaultLoadingText || _userLocationTextLong === defaultLoadingText){
        let _errMsg: string = errorMsgState
        let _userLocation: Location.LocationObject = defaultPosition
        
        // Possible values: {"GRANTED":"granted","UNDETERMINED":"undetermined","DENIED":"denied"}
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            _errMsg = 'Permission to access location was denied'
        }
        console.log(`Location Status: ${status.toString()}`)
        _userLocation = await Location.getCurrentPositionAsync({})
        setUserLocationCaller(_userLocation)

        if (_errMsg !== '') {
            setErrorMsgCaller(_errMsg)
            _userLocationTextLat = _errMsg
            setUserLocationTextLatCaller(_errMsg)
            setUserLocationTextLongCaller(_errMsg)
        } else if (_userLocation !== defaultPosition) {
            setUserLocationCaller(_userLocation)

            if (onDataReceivedCaller) {
                // Send locations to parent component to save
                onDataReceivedCaller({
                    latitude: _userLocation.coords.latitude,
                    longitude: _userLocation.coords.longitude
                })
            }
            _userLocationTextLat = (Math.round(_userLocation.coords.latitude * 100) / 100).toFixed(3)
            _userLocationTextLong = (Math.round(_userLocation.coords.longitude * 100) / 100).toFixed(3)
        } else {
            _userLocationTextLat = 'Still Loading...'
            _userLocationTextLong = 'Still Loading...'
        }; 
        setUserLocationTextLatCaller(_userLocationTextLat)
        setUserLocationTextLongCaller(_userLocationTextLong)
        setUserLocationCaller(_userLocation)
        console.log(`Location lat, long: ${_userLocationTextLat}, ${_userLocationTextLong}`)
    };
};

export default requestPermissionsAndLocationAsync;