import { LatLng, LeafletView, MapMarker, MapShape, MapShapeType, WebViewLeafletEvents, WebviewLeafletMessage } from 'react-native-leaflet-view-2';
import { favoritePlaceData } from '@/assets/data/favorite-places';
import { Colors } from '@/app/constants/Colors';
import ChartComponent from './ChartComponent';
import { Dimensions, View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useMemo, useState } from 'react';
import * as d3 from 'd3';
import { DivIcon } from 'leaflet';
// import { DivIcon } from 'leaflet';
// import Svg, { G, Path, Circle } from "react-native-svg";
// import { DivIcon, Util } from 'leaflet';
// import Loader from '@app/assets/images/loading-svgrepo-com.svg'

export function MapComponent() {
  // const [zoomLevel, setZoomLevel] = useState(7); // initial zoom level provided for MapContainer
  const [mapMessage, setMapMessage] = useState(''); // initial zoom level provided for MapContainer

  const onMessageReceived = (message: WebviewLeafletMessage) => {
    switch (message.event) {
      case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
        Alert.alert(
          `Map Marker Touched, ID: ${message.payload.mapMarkerID || "unknown"}`
        );

        break;
      case WebViewLeafletEvents.ON_MAP_TOUCHED:
        const position: LatLng = message.payload
          ?.touchLatLng as LatLng;
        const id: string = message.payload
          ?.mapMarkerID as string;
        Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng} for id: ${id}`);
        break;
      case WebViewLeafletEvents.ON_ZOOM_END:
        const zoomLevel: number = message.payload
          ?.zoom as number;
          // setZoomLevel(zoomLevel);
          // Alert.alert(`New zoom leve:`, `${zoomLevel}`);

        break;
      default:
        console.log("App received", message);
    }
  };
  // const mapEvents = useMapEvents({
  //   zoomend: () => {
  //       setZoomLevel(mapEvents.getZoom());
  //   },
  // });

  const {height, width} = Dimensions.get("window");              

  const DEFAULT_COORDINATE: LatLng = {
    lat: 45.04105544754055,
    lng: -90.8013689517975, 
  };

  // const pinInnerCircleRadius = 48
  // const mapIconColor = '#cc756b';
  // const mapIconColorInnerCircle = '#ffffff';

  // const iconSettings = {
  //   mapIconUrl: '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="${mapIconColor}" stroke="#FFFFFF" stroke-width="6" stroke-miterlimit="10"><circle cx="50" cy="50" r="{pinInnerCircleRadius}" fill="{mapIconColorInnerCircle}"</circle></svg>',
  //   mapIconColor: '#cc756b',
  //   mapIconColorInnerCircle: '#fff',
  //   pinInnerCircleRadius: 48
  // }

  // icon normal state
  // const _divIcon = new DivIcon({
  //     className: "leaflet-data-marker",
  //     html: '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="${mapIconColor}" stroke="#FFFFFF" stroke-width="6" stroke-miterlimit="10"><circle cx="50" cy="50" r="{pinInnerCircleRadius}" fill="{mapIconColorInnerCircle}"</circle></svg>',
  //     iconAnchor: [12, 32],
  //     iconSize: [25, 30],
  //     popupAnchor: [0, -28],
  // });

  // var customSvg = `<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="${mapIconColor}" stroke="#FFFFFF" stroke-width="6" stroke-miterlimit="10"><circle cx="50" cy="50" r="${pinInnerCircleRadius}" fill="${mapIconColorInnerCircle}"</circle></svg>`
  // // var iconUrl = 'data:image/svg+xml;base64,' + btoa(customSvg);

  // var icon = L.icon( {
  //           iconUrl: iconUrl,
  //       } );
  
  // Testing adding mapMarkers
  let mapMarkers: MapMarker[] = []
  for (let i = 0; i < favoritePlaceData.features.length; i++) {
    mapMarkers.push({
      id: favoritePlaceData.features[i].properties.index.toString(),
      positions: {
        lng: favoritePlaceData.features[i].geometry.coordinates[0], 
        lat: favoritePlaceData.features[i].geometry.coordinates[1]
      },
      // divIcon: _divIcon,
      // icon: customSvg, //iconUrl,//'📍',
      icon: '📍',
      // icon: Svg()
      size: [32, 32],
      // color: Colors.lightBlue
    })
  }

  const colorize = useMemo(() => {
      // const colorScale = d3.scaleSequentialSymlog(d3.interpolateReds)
      //     .domain([0, maxHappyScoreY]);
          
      const colorScale = d3.scaleLinear(["red", "blue"])
          // .domain([0, maxHappyScoreY])
          .domain([0, 10])
          .clamp(true)

      return colorScale;
    }, [])

    
    // Load shapes for each location
    let mapShapes: MapShape[] = []

    // Adjust size of shapes based on zoom scale
    for (let i = 0; i < favoritePlaceData.features.length; i++) {
      let curHappyScore = favoritePlaceData.features[i].properties.happy_score;
      let curCalmScore = favoritePlaceData.features[i].properties.calmness_score;
      mapShapes.push({
          // color: Colors.lightGreen,
          id: favoritePlaceData.features[i].properties.index.toString(),
          color: colorize(curHappyScore),
          positions: {
            lng: favoritePlaceData.features[i].geometry.coordinates[0], 
            lat: favoritePlaceData.features[i].geometry.coordinates[1]
          },
          center: {
            lng: favoritePlaceData.features[i].geometry.coordinates[0], 
            lat: favoritePlaceData.features[i].geometry.coordinates[1]
          },
          radius: curCalmScore * 1000,// * zoomLevel,
          shapeType: MapShapeType.CIRCLE
    })
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChartComponent height={height} width={width}/>
      <LeafletView
          onMessageReceived={onMessageReceived}
          doDebug={true}
          // mapMarkers={mapMarkers}
          // renderLoading={loader}
          mapShapes={mapShapes}
          // mapLayers={mapLayers}
          mapCenterPosition={DEFAULT_COORDINATE}
          zoomControl={true}
          zoom={7}
      />
    </SafeAreaView>
  );
};

export default MapComponent;


const styles = StyleSheet.create({
  container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
  }
});