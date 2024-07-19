import { LatLng, LeafletView, MapMarker, MapShape, MapShapeType, WebViewLeafletEvents, WebviewLeafletMessage } from 'react-native-leaflet-view-2';
import { favoritePlaceData } from '@/assets/data/favorite-places';
import { Dimensions, StyleSheet, Text, Image, SafeAreaView, Modal, Alert, View, Pressable } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import * as d3 from 'd3';
import { useSQLiteContext } from 'expo-sqlite';
import Svg from 'react-native-svg';
import { Colors } from '../constants/Colors';
import { MoodValue } from '../database/interfaces/interfaces';

// import { IFrameWebView } from './IFrameWebView';

const {height, width} = Dimensions.get("window");              

export function MapComponent({mapData}: {mapData: MoodValue[]}) {
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);
  const [mapShapes, setMapShapes] = useState<MapShape[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [_, showOpenButton] = useState(true);
  const [clusterIconsVisible, setClusterIconsVisible] = useState(true);
  const [clusterButtonText, setClusterButtonText] = useState('Uncluster Icons');

  // const [mapPeriod, setMapPeriod] = React.useState<Period>(Period.week);

  const db = useSQLiteContext();

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
  // const mapEvents = useMapEvents({
  //   zoomend: () => {
  //       setZoomLevel(mapEvents.getZoom());
  //   },
  // });


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
    }, [clusterIconsVisible])
  
  let _mapMarkers: MapMarker[] = []
  let _mapShapes: MapShape[] = []

  useMemo(() => {
    // Testing adding mapMarkers
    // if (mapData) {
      mapData.forEach(feature => {
        const colorVal = colorize(feature.happy_score);
        const sizeVal = feature.calmness_score;
          _mapMarkers.push({
          id: feature.id.toString(),
          position: {
            lat: feature.latitude_x,
            lng: feature.longitude_y 
          },
          icon: customSvgMaker(colorVal, (sizeVal + 1) * 20), 
          size: [32, 32]
        })});
        setMapMarkers(_mapMarkers);
    // } else {
    //   favoritePlaceData.features.forEach(feature => {
    //     const colorVal = colorize(feature.properties.happy_score);
    //     const sizeVal = feature.properties.calmness_score;
    //       _mapMarkers.push({
    //       id: feature.properties.index.toString(),
    //       position: {
    //         lat: feature.geometry.coordinates[1],
    //         lng: feature.geometry.coordinates[0] 
    //       },
    //       icon: customSvgMaker(colorVal, (sizeVal + 1) * 20), 
    //       // icon: '○', //'📍',
    //       size: [32, 32]
    //     })});
        // setMapMarkers(_mapMarkers);
    // };
  }, [mapData]);

    // Load shapes for each location
    useMemo(() => {
      // Add a scale for bubble size of Happy(10)/Sad(0) Score Mood Value
      mapData.forEach(feature => {
        let curHappyScore = feature.happy_score;
        let curCalmScore = feature.calmness_score;
        _mapShapes.push({
            // color: Colors.lightGreen,
            id: feature.id.toString(),
            color: colorize(curHappyScore),
            positions: {
              lat: feature.latitude_x,
              lng: feature.longitude_y
            },
            center: {
              lat: feature.latitude_x,
              lng: feature.longitude_y
            },
            radius: curCalmScore * 3000,// * zoomLevel,
            shapeType: MapShapeType.CIRCLE
      })});
      setMapShapes(_mapShapes);
    }, [mapData]);

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
            {clusterIconsVisible ? 
                <LeafletView
                onMessageReceived={onMessageReceived}
                // doDebug={true}
                mapMarkers={mapMarkers}
                mapShapes={[]}
                // renderLoading={loader}
                // mapLayers={mapLayers}
                mapCenterPosition={DEFAULT_COORDINATE}
                zoomControl={true}
                zoom={7}
              ></LeafletView>
            : 
              <LeafletView
                onMessageReceived={onMessageReceived}
                // doDebug={true}
                mapMarkers={[]}
                mapShapes={mapShapes}
                // renderLoading={loader}
                // mapLayers={mapLayers}
                mapCenterPosition={DEFAULT_COORDINATE}
                zoomControl={true}
                zoom={7}
              ></LeafletView>
            }
            <Modal
              animationType='fade'
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.container}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Legend</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {setModalVisible(!modalVisible); showOpenButton(!modalVisible)}}>
                    <Text style={styles.textStyle}>Hide Legend</Text>
                    <Image
                      style={styles.legend}
                      source={require('../../assets/images/map-legend.png')}
                    />
                    <Text style={styles.smallModalText}>~tap to close~</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            {modalVisible ? <></> :
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {setModalVisible(true); showOpenButton(!modalVisible)}}>
                <Text style={styles.textStyle}>Legend</Text>
              </Pressable>
            }
            <Pressable
                style={[styles.clusterButton]}
                onPress={() => {
                  setClusterIconsVisible(!clusterIconsVisible); 
                  if (clusterIconsVisible) {
                    setClusterButtonText('Uncluster Icons');
                  } else {
                    setClusterButtonText('See Clustered Icons');
                  }
                } }>
              <Text style={styles.textStyle}>{clusterButtonText}</Text>
            </Pressable>
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    bottom: 10
  },
  buttonClose: {
    backgroundColor: Colors.lightBlue
    },
  buttonOpen: {
    backgroundColor: Colors.lightBlue
  },
  clusterButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 3,
    position: 'absolute',
    bottom: 10,
    right: 5,
    backgroundColor: Colors.lightBlue
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  smallModalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 10
  },
});