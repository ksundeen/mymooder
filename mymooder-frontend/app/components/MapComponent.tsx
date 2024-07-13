import { LatLng, LeafletView, MapMarker, MapShape, MapShapeType, WebViewLeafletEvents, WebviewLeafletMessage } from 'react-native-leaflet-view-2';
import { favoritePlaceData } from '@/assets/data/favorite-places';
import ChartComponent from './ChartComponent';
import { Dimensions, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import * as d3 from 'd3';
// import { IFrameWebView } from './IFrameWebView';

export function MapComponent() {
  // const [zoomLevel, setZoomLevel] = useState(7); // initial zoom level provided for MapContainer
  const [mapMessage, setMapMessage] = useState(''); // initial zoom level provided for MapContainer
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);

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

  const circleRadius = 30
  const innerCircleRadius = 5
  const mapIconColor = '#cc756b';
  const mapIconColorInnerCircle = '#ffffff';

  // https://www.svgrepo.com/svg/174809/empty-circle?edit=true
  // const customSvg = `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  //           <svg fill="${mapIconColor}" height="${circleRadius}px" width="${circleRadius}px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-24 -24 348.00 348.00" xml:space="preserve" stroke="${mapIconColorInnerCircle}" stroke-width="${innerCircleRadius}">
  //           <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#fdfcfc" stroke-width="40"> <path d="M150,0C67.29,0,0,67.29,0,150s67.29,150,150,150s150-67.29,150-150S232.71,0,150,0z M150,270c-66.169,0-120-53.832-120-120 S83.831,30,150,30s120,53.832,120,120S216.168,270,150,270z"/> </g>
  //           <g id="SVGRepo_iconCarrier"> <path d="M150,0C67.29,0,0,67.29,0,150s67.29,150,150,150s150-67.29,150-150S232.71,0,150,0z M150,270c-66.169,0-120-53.832-120-120 S83.831,30,150,30s120,53.832,120,120S216.168,270,150,270z"/> </g>
  //           </svg>`
  
  const customSvgMaker = (color: string, size: number, innerColor: string=mapIconColorInnerCircle, innCircleRadius: number=innerCircleRadius) => {
    return `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
            <svg fill="${color}" height="${size}px" width="${size}px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-24 -24 348.00 348.00" xml:space="preserve" stroke="${mapIconColorInnerCircle}" stroke-width="${innerCircleRadius}">
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#fdfcfc" stroke-width="40"> <path d="M150,0C67.29,0,0,67.29,0,150s67.29,150,150,150s150-67.29,150-150S232.71,0,150,0z M150,270c-66.169,0-120-53.832-120-120 S83.831,30,150,30s120,53.832,120,120S216.168,270,150,270z"/> </g>
            <g id="SVGRepo_iconCarrier"> <path d="M150,0C67.29,0,0,67.29,0,150s67.29,150,150,150s150-67.29,150-150S232.71,0,150,0z M150,270c-66.169,0-120-53.832-120-120 S83.831,30,150,30s120,53.832,120,120S216.168,270,150,270z"/> </g>
            </svg>`
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
  
  let _mapMarkers: MapMarker[] = []
  useEffect(() => {
    // Testing adding mapMarkers
    favoritePlaceData.features.forEach(feature => {
      const colorVal = colorize(feature.properties.happy_score);
      const sizeVal = feature.properties.calmness_score;
        _mapMarkers.push({
        id: feature.properties.index.toString(),
        position: {
          lng: feature.geometry.coordinates[0], 
          lat: feature.geometry.coordinates[1]
        },
        icon: customSvgMaker(colorVal, sizeVal * 10), 
        // icon: '○', //'📍',
        size: [32, 32]
      })});
      setMapMarkers(_mapMarkers);
    }, [favoritePlaceData.features]);
    
    // Load shapes for each location
    // let mapShapes: MapShape[] = []

    // Add a scale for bubble size of Happy(10)/Sad(0) Score Mood Value
    // favoritePlaceData.features.forEach(feature => {
    //   let curHappyScore = feature.properties.happy_score;
    //   let curCalmScore = feature.properties.calmness_score;
    //   mapShapes.push({
    //       // color: Colors.lightGreen,
    //       id: feature.properties.index.toString(),
    //       color: colorize(curHappyScore),
    //       positions: {
    //         lng: feature.geometry.coordinates[0],
    //         lat: feature.geometry.coordinates[1]
    //       },
    //       center: {
    //         lng: feature.geometry.coordinates[0],
    //         lat: feature.geometry.coordinates[1]
    //       },
    //       radius: curCalmScore * 1000,// * zoomLevel,
    //       shapeType: MapShapeType.CIRCLE
    // })});

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
            // doDebug={true}
            mapMarkers={mapMarkers}
            // renderLoading={loader}
            // mapShapes={mapShapes}
            // mapLayers={mapLayers}
            mapCenterPosition={DEFAULT_COORDINATE}
            zoomControl={true}
            zoom={7}
          ></LeafletView>
        {/* }
       >
       </IFrameWebView>  */}
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