import { useEffect, useMemo, useState } from 'react';
import * as d3 from 'd3';
import { 
  LatLng, 
  MapMarker, 
  MapShape, 
  MapShapeType } from 'react-native-leaflet-view-2';
import { MapComponent } from '../components/MapComponent';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { MoodValue } from '../database/types';
import { crudMoodValuesMethods} from '@/app/database/crudMethods'
import ButtonComponent from '../components/ButtonComponent';
import { ModalLegendButtons } from '../components/modals/ModalLegendButtons';
import centroid from '@turf/centroid';
import polygon from 'turf-polygon';
import { requestPermissionsAndLocationAsync } from "@/app/utils/RequestPermissionsAndLocationAsync"
import * as Location from "expo-location";
import { Colors } from '../constants/Colors';
const { getAllMoodValues } = crudMoodValuesMethods();

export default function MapEntry({setLocationsFromMapToMoodCaller}: {setLocationsFromMapToMoodCaller: Function}) {
  // Map locations
  const [mapData, setMapData] = useState<MoodValue[]>([]);
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);
  const [mapShapes, setMapShapes] = useState<MapShape[]>([]);
  const [recenterMap, setRecenterMap] = useState<boolean>(true);
  const [mapCenter, setMapCenter] = useState<LatLng | null>(null);
  
  // Whether the cluster icons are visible or should SVG icons show
  const [clusterIconsVisible, setClusterIconsVisible] = useState<boolean>(true);

  // Setting user location
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [userLocationCount, setUserLocationCount] = useState<number>(0);
  const [userLocationTextLat, setUserLocationTextLat] = useState<string>('');
  const [userLocationTextLong, setUserLocationTextLong] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const innerCircleRadius = 5
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

  useMemo(() => {
    if (userLocation) {
      let count = userLocationCount

      // Clear out userLocation to stop updating state
      setUserLocation(null)

      {/* @ts-ignore */}
      const _userLocation: LatLng = {
        lat: userLocation.coords.latitude, 
        lng: userLocation.coords.longitude
      }

      {/* @ts-ignore */}
      setMapCenter(_userLocation)
      
      if (userLocationCount === 0 ) {

        // if (count === 0) {
          // To store User's Location if requested to see on map. 
          // Add to both mapShapes and mapMarkers.
          // We don't want to store it permanently though, so it will be removed upon refresh.
          const userLocationMapMarker: MapMarker = {
            id: '-123',
            // icon: "❤️",
            /* @ts-ignore */
            position: _userLocation,
            icon: customSvgMaker("#40E0D0", (4) * 20), 
            // {/* @ts-ignore */}
            // {/* @ts-ignore */}
            // size: [32, 32]
          }

          const userLocationMapShape: MapShape = {
            shapeType: MapShapeType.CIRCLE,
            color: "#40E0D0",
            id: "-123",
            center: _userLocation,
            radius: 6000,
          }
        
          // // Add to mapShapes
          const newMapShapes = [...mapShapes]
          // const newMapShapes = []
          newMapShapes.push(userLocationMapShape)

          // // Add to mapMarkers
          const newMapMarkers = [...mapMarkers]
          // const newMapMarkers = []
          newMapMarkers.push(userLocationMapMarker)
          
          // Set new mapShapes and mapMarkers
          setMapShapes(newMapShapes)
          setMapMarkers(newMapMarkers)
        // }
        setUserLocationCount(count+=1)
      }
    }
  }, [userLocation, userLocationCount])

  const db = useSQLiteContext();

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

  const requestLocation = async () => {
    // Not sending another parent caller function
    const onDataReceivedCaller = null

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

  const calculateMapCenter = (_polyArray: number[][]) => {
    let _newPolygonArray: number[][] = []
    let _newCenter: null | LatLng = null

    // Need to calculate map center with at least 3 polygons, where the 
    // 1st and last polygons will be the same points to make a polygon
    if (_polyArray && _polyArray?.length > 2 && mapData?.length > 2) {
      mapData.forEach(feature => {
        let _position: number[] = [feature.latitude_x, feature.longitude_y]

        // To calculate centroid of all points
        _newPolygonArray.push(_position)
      })

      // Push the 1st point coordinate into the last position to make a polygon
      let _lastPosition: number[] = [mapData[0].latitude_x, mapData[0].longitude_y]
      _newPolygonArray.push(_lastPosition)
      console.log(_newPolygonArray)
      const _polygon = polygon([_newPolygonArray])
      const _centroid = centroid(_polygon)

      if (_centroid?.geometry?.coordinates) {
        {/* @ts-ignore */}
        _newCenter = {
          lat: _centroid.geometry.coordinates[0], 
          lng: _centroid.geometry.coordinates[1]
        }
        setMapCenter(_newCenter)
      }
    } else {//else if (mapData?.length < 3 && mapData?.length > 1) {
      // Calculate average latitude
      const _allLats: number[] = [...mapData.map(feature => feature.latitude_x)];
      const aveLat = (_allLats.reduce((total, current) => total + current)) / _allLats.length

      // const aveLat: number = _allLats / _allLats.length
      // Calculate average longtitude
      const _allLongs: number[] = [...mapData.map(feature => feature.longitude_y)];
      const aveLong = (_allLongs.reduce((total, current) => total + current)) / _allLongs.length

      // Set default map center
      {/* @ts-ignore */}
      _newCenter = {
        lat: aveLat, 
        lng: aveLong
      }
      setMapCenter(_newCenter)
    } 
  };

  if (recenterMap && mapData.length > 0) {
    calculateMapCenter([[]])
    setRecenterMap(false)
  };

  // Is called only once to load data initially
  useMemo(async () => {
    setMapData(await getAllMoodValues(db));
  }, []);
  
  // If map is refreshed then same call is made.
  const refreshMap = async () => {
    setUserLocationCount(0)
    setUserLocation(null)
    setMapData(await getAllMoodValues(db));
  };

  const colorize = useMemo(() => {  
    const colorScale = d3.scaleLinear(["red", "blue"])
        // .domain([0, maxHappyScoreY])
        .domain([0, 10])
        .clamp(true)

    return colorScale;
  }, [clusterIconsVisible]);

  // Load shapes for each location
  useMemo(() => {
    let _mapMarkers: MapMarker[] = []
    let _mapShapes: MapShape[] = []
    let _polygonArray: number[][] = []
    
    // Add a scale for bubble size of Happy(10)/Sad(0) Score Mood Value
    mapData.forEach(feature => {

      let curHappyScore = feature.happy_score;
      let curCalmScore = feature.calmness_score;
      {/* @ts-ignore */}
      let _position: LatLng = {
        lat: feature.latitude_x,
        lng: feature.longitude_y
      }

      // To calculate centroid of all points
      _polygonArray.push([_position.lat, _position.lng])

      // Map Shapes
      _mapShapes.push({
          // color: Colors.lightGreen,
          id: feature.id.toString(),
          color: colorize(curHappyScore),
          //{/* @ts-ignore */}
          positions: _position,
          center: _position,
          radius: curCalmScore * 3000,// * zoomLevel,
          shapeType: MapShapeType.CIRCLE
      });

      // Map Markers
      const colorVal = colorize(feature.happy_score);
      const sizeVal = feature.calmness_score;
        _mapMarkers.push({
          id: feature.id.toString(),
          // {/* @ts-ignore */}
          position: {
            lat: feature.latitude_x,
            lng: feature.longitude_y 
        },
        icon: customSvgMaker(colorVal, (sizeVal + 1) * 20), 
        // {/* @ts-ignore */}
        // {/* @ts-ignore */}
        size: [32, 32]
      });
    });
    
    setMapMarkers(_mapMarkers);
    setMapShapes(_mapShapes);

    // calculateMapCenter(_polygonArray)

}, [mapData]);

return (
    <SafeAreaView style={styles.root}>
      <MapComponent 
        setLocationsFromMapToMoodCaller={setLocationsFromMapToMoodCaller}
        mapData={mapData} 
        clusterIconsVisible={clusterIconsVisible}
        mapCenter={mapCenter}
        mapShapes={mapShapes}
        mapMarkers={mapMarkers}
      />
      <ModalLegendButtons 
        setRecenterMapCaller={setRecenterMap} 
        clusterIconsVisible={clusterIconsVisible} 
        setClusterIconsVisibleCaller={setClusterIconsVisible}
      />

      {/* This button flex affects how the buttons in the ModalLegendButton grey area at the bottom of the map */}
      <View style={styles.buttonRow}>
        <ButtonComponent 
          useImageIcon 
          imageSource={require('@/assets/images/navigation.png')} 
          imageStyle={styles.locateButton} 
          extraStyles={styles.extraStylesLocate}
          diffFlex={0.01} 
          diffPadding={5} 
          buttonWidth={35} 
          onPress={async () => await requestLocation()} 
          text='Request Location'
        />
        <ButtonComponent extraStyles={styles.extraStyles} 
          diffFlex={0.01} 
          diffPadding={10} 
          buttonWidth={100} 
          onPress={() => refreshMap()} 
          text='Refresh Map' />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flex: 0.08,
    marginHorizontal: "auto",
    flexDirection: "row",
  },
  extraStyles: {
    bottom: "13%", 
  },
  extraStylesLocate: {
    position: 'absolute',
    top: "-55%",
    left: "-42%",
  },
  locateButton: {
    height: 25,
    width: 25,
    color: Colors.lightBlue
  },
});
