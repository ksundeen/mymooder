import { 
  LatLng, 
  LeafletView, 
  MapMarker, 
  MapShape, 
  WebViewLeafletEvents, 
  WebviewLeafletMessage } from 'react-native-leaflet-view-2';
// import { favoritePlaceData } from '@/assets/data/favorite-places';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import Svg from 'react-native-svg';
import { LocationValues, MoodValue } from '../database/interfaces/interfaces';
import ModalInfoBox from './modals/ModalInfoBox';
// import { IFrameWebView } from './IFrameWebView';

const {height, width} = Dimensions.get("window");              

export function MapComponent({setLocationsFromMapCaller, 
                              mapData, 
                              clusterIconsVisible, 
                              mapCenter, 
                              mapShapes, 
                              mapMarkers}: 
  { setLocationsFromMapCaller: Function, 
    mapData: MoodValue[], 
    clusterIconsVisible: boolean, 
    mapCenter: LatLng | null, 
    mapShapes: MapShape[], 
    mapMarkers: MapMarker[]}
  ) {
  
  // To send locations clicked on map to Mood Screen
  const [selectedMoodLocation, setSelectedMoodLocation] = useState<MoodValue | null>(null);
  const [selectedLocationValues, setSelectedLocationValues] = useState<LocationValues | null>(null);
  
  // Whether to show the clicked icon info box modal; state passed to modal component
  const [showInfoBoxModal, setShowInfoBoxModal] = useState<boolean>(false);

  // const [mapPeriod, setMapPeriod] = React.useState<Period>(Period.week);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (chartPeriod === Period.week) {
  //       const { startDate, endDate } = getWeekRange(currentDate);
  //       setCurrentEndDate(() => new Date(startDate));
  //       const data = await fetchWeeklyData(startDate, endDate, transactionType);
  //       console.log("Data before process", data);
  //       setBarData(processWeeklyData(data, transactionType));
  //       setChartKey((prev) => prev + 1);
  //     }
  //   };
  //   fetchData();
  // }, [chartPeriod, currentDate, transactionType]);

  const onMessageReceived = (message: WebviewLeafletMessage) => {
    switch (message.event) {
      case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
        const idMarkerClicked: string = message.payload?.mapMarkerID as string;
        const selectedPoint: MoodValue = mapData.filter(feature => feature.id === Number(idMarkerClicked))[0]
        setSelectedLocationValues(null)
        setSelectedMoodLocation(selectedPoint)
        setShowInfoBoxModal(true)
          // Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng} for id: ${id}`);

        break;
      case WebViewLeafletEvents.ON_MAP_TOUCHED:
        const position: LatLng = message.payload?.touchLatLng as LatLng;
        console.log(JSON.stringify(position))
          setSelectedMoodLocation(null)
          console.log(JSON.stringify(position))
          setSelectedLocationValues({latitude: Number(position.lat), longitude: Number(position.lng)})
          setShowInfoBoxModal(true)
        break;
      // case WebViewLeafletEvents.ON_ZOOM_END:
      //   const zoomLevel: number = message.payload
      //     ?.zoom as number;
      //     // setZoomLevel(zoomLevel);
      //     // Alert.alert(`New zoom leve:`, `${zoomLevel}`);

      //   break;
      default:
        console.log("App received", message);
    }
  };

    // const mapLayers = [
    //   {
    //     baseLayerName: 'Openstreet Map',  // the name of the layer, this will be seen in the layer selection control
    //     baseLayerIsChecked: 'false',  // if the layer is selected in the layer selection control
    //     layerType: 'TileLayer',  // Optional: a MapLayerType enum specifying the type of layer see "Types of Layers" below. Defaults to TILE_LAYER
    //     baseLayer: true,
    //     // url of tiles
    //     url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //     // attribution string to be shown for this layer
    //     attribution:
    //       '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
    //   }
    //   ,{
    //   baseLayerName: 'Mapbox Aerial',  // the name of the layer, this will be seen in the layer selection control
    //   baseLayerIsChecked: 'false',  // if the layer is selected in the layer selection control
    //   layerType: 'TileLayer',  // Optional: a MapLayerType enum specifying the type of layer see "Types of Layers" below. Defaults to TILE_LAYER
    //   baseLayer: true,
    //   // url of tiles
    //   url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${process.env.MAPBOX_TOKEN}`,
    //   attribution: ''
    // }
  // ]

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} />
      {/* <IFrameWebView 
          source={ */}
        {/* <SegmentedControl
          values={["Week", "Month", "Year"]}
          style={{ marginBottom: 16 }}
          selectedIndex={currentTab}
          onChange={(event) => {
            const index = event.nativeEvent.selectedSegmentIndex;
            if (index === 0) {
              setChartPeriod(Period.week);
              } else if (index === 1) {
                setChartPeriod(Period.month);
                } else {
                  setChartPeriod(Period.year);
              }
              }}
              /> */}
            <ModalInfoBox
              locationValues={selectedLocationValues}
              moodValue={selectedMoodLocation}
              showInfoBoxModal={showInfoBoxModal}
              setShowInfoBoxModalCaller={setShowInfoBoxModal}
              setLocationsFromMapToMoodCaller={setLocationsFromMapCaller}            
            />
            {mapCenter ? 
              <LeafletView
                onMessageReceived={onMessageReceived}
                // doDebug={true}
                mapMarkers={clusterIconsVisible ? mapMarkers : []}
                mapShapes={clusterIconsVisible ? [] : mapShapes}
                // renderLoading={loader}
                // mapLayers={mapLayers}
                mapCenterPosition={mapCenter}
                zoomControl={true}
                zoom={7}
            ></LeafletView>
            :
            <LeafletView
              onMessageReceived={onMessageReceived}
              // doDebug={true}
              mapMarkers={clusterIconsVisible ? mapMarkers : []}
              mapShapes={clusterIconsVisible ? [] : mapShapes}
              // renderLoading={loader}
              // mapLayers={mapLayers}
              zoomControl={true}
              zoom={7}
            ></LeafletView>
            }
        {/* }

       >
       </IFrameWebView>  */}
    </View>
  );
};

export default MapComponent;


const styles = StyleSheet.create({
  container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
  },
  legend:{
    height: 300,
    width: 375,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});