import { LatLng, LeafletView, MapMarker, MapShape, MapShapeType, WebViewLeafletEvents, WebviewLeafletMessage } from 'react-native-leaflet-view-2';
import { favoritePlaceData } from '@/assets/data/favorite-places';
// import { Colors } from '@/app/constants/Colors';
import ChartComponent from './ChartComponent';
import { Dimensions, View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useMemo, useState } from 'react';
import * as d3 from 'd3';
// import { DivIcon } from 'leaflet';
// import { DivIcon } from 'leaflet';
// import Svg, { G, Path, Circle } from "react-native-svg";
// import { DivIcon, Util } from 'leaflet';
// import Loader from '@app/assets/images/loading-svgrepo-com.svg'
// import { IFrameWebView } from './IFrameWebView';

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

  const pinInnerCircleRadius = 48
  const mapIconColor = '#cc756b';
  const mapIconColorInnerCircle = '#ffffff';

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

  var customSvg = `<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="${mapIconColor}" stroke="#FFFFFF" stroke-width="6" stroke-miterlimit="10"><circle cx="50" cy="50" r="${pinInnerCircleRadius}" fill="${mapIconColorInnerCircle}"</circle></svg>`
  // // var iconUrl = 'data:image/svg+xml;base64,' + btoa(customSvg);

  // var icon = L.icon( {
  //           iconUrl: iconUrl,
  //       } );
  
  // Testing adding mapMarkers
  let mapMarkers: MapMarker[] = []
  favoritePlaceData.features.forEach(feature => {
    mapMarkers.push({
      id: feature.properties.index.toString(),
      positions: {
        lng: [feature.geometry.coordinates[0]], 
        lat: [feature.geometry.coordinates[1]]
      },
      // divIcon: _divIcon,
      icon: customSvg, //iconUrl,//'📍',
      // icon: '📍',
      // icon: Svg()
      size: [32, 32],
      // color: Colors.lightBlue
    })});

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

    // Add a scale for bubble size of Happy(10)/Sad(0) Score Mood Value
    favoritePlaceData.features.forEach(feature => {
      let curHappyScore = feature.properties.happy_score;
      let curCalmScore = feature.properties.calmness_score;
      mapShapes.push({
          // color: Colors.lightGreen,
          id: feature.properties.index.toString(),
          color: colorize(curHappyScore),
          positions: {
            lng: feature.geometry.coordinates[0],
            lat: feature.geometry.coordinates[1]
          },
          center: {
            lng: feature.geometry.coordinates[0],
            lat: feature.geometry.coordinates[1]
          },
          radius: curCalmScore * 1000,// * zoomLevel,
          shapeType: MapShapeType.CIRCLE
    })});

    const mapLayers = [
      {
        baseLayerName: 'Openstreet Map',  // the name of the layer, this will be seen in the layer selection control
        baseLayerIsChecked: 'false',  // if the layer is selected in the layer selection control
        layerType: 'TileLayer',  // Optional: a MapLayerType enum specifying the type of layer see "Types of Layers" below. Defaults to TILE_LAYER
        baseLayer: true,
        // url of tiles
        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        // attribution string to be shown for this layer
        attribution:
          '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
      }
    //   ,{
    //   baseLayerName: 'Mapbox Aerial',  // the name of the layer, this will be seen in the layer selection control
    //   baseLayerIsChecked: 'false',  // if the layer is selected in the layer selection control
    //   layerType: 'TileLayer',  // Optional: a MapLayerType enum specifying the type of layer see "Types of Layers" below. Defaults to TILE_LAYER
    //   baseLayer: true,
    //   // url of tiles
    //   url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${process.env.MAPBOX_TOKEN}`,
    //   attribution: ''
    // }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ChartComponent height={height} width={width}/>
      {/* <IFrameWebView 
          source={ */}
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
          ></LeafletView>
         {/* }
       >
       </IFrameWebView> */}
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