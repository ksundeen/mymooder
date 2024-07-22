import { useMemo, useState } from 'react';
import * as d3 from 'd3';
import { 
  LatLng, 
  MapMarker, 
  MapShape, 
  MapShapeType } from 'react-native-leaflet-view-2';
import { MapComponent } from '../components/MapComponent';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { MoodValue } from '../database/interfaces/interfaces';
import { crudMoodValuesMethods} from '@/app/database/crudMethods'
import ButtonComponent from '../components/ButtonComponent';
import { ModalLegendButtons } from '../components/modals/ModalLegendButtons';
import centroid from '@turf/centroid';
import polygon from 'turf-polygon';

const { getMoodValues } = crudMoodValuesMethods();

export default function Map() {
  // Map locations
  const [mapData, setMapData] = useState<MoodValue[]>([]);
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);
  const [mapShapes, setMapShapes] = useState<MapShape[]>([]);
  const [recenterMap, setRecenterMap] = useState(false);
  const [mapCenter, setMapCenter] = useState<LatLng | null>(null);
  
  // Whether the cluster icons are visible or should SVG icons show
  const [clusterIconsVisible, setClusterIconsVisible] = useState<boolean>(true);

  const db = useSQLiteContext();
  
  const refreshMap = async () => {
    setMapData(await getMoodValues(db));
  };

  const calculateMapCenter = (_polyArray: number[][]) => {
    let _newPolygonArray: number[][] = []
    let _newCenter: null | LatLng = null

    if (_polyArray.length > 0) {
      mapData.forEach(feature => {
        let _position: number[] = [feature.latitude_x, feature.longitude_y]

        // To calculate centroid of all points
        _newPolygonArray.push(_position)
      })

      // Push the 1st point coordinate into the last position to make a polygon
      let _lastPosition: number[] = [mapData[0].latitude_x, mapData[0].longitude_y]
      _newPolygonArray.push(_lastPosition)
    
      const _polygon = polygon([_newPolygonArray])
      const _centroid = centroid(_polygon)

      if (_centroid?.geometry?.coordinates) {
        _newCenter = {
          lat: _centroid.geometry.coordinates[0], 
          lng: _centroid.geometry.coordinates[1]
        }
        setMapCenter(_newCenter)
      }
    }
  };

  if (recenterMap && mapData.length > 0) {
    setRecenterMap(false)
    calculateMapCenter([[]])
  };

  useMemo(async () => {
    setMapData(await getMoodValues(db));
  }, []);
  
  const extraStyles: {} = {
    bottom: "9%", 
  }

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
        position: {
          lat: feature.latitude_x,
          lng: feature.longitude_y 
        },
        icon: customSvgMaker(colorVal, (sizeVal + 1) * 20), 
        size: [32, 32]
      });
    });
    
    setMapMarkers(_mapMarkers);
    setMapShapes(_mapShapes);

    calculateMapCenter(_polygonArray)

}, [mapData]);

return (
    <SafeAreaView style={styles.root}>
      <MapComponent 
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
      <ButtonComponent extraStyles={extraStyles} diffFlex={0.07} diffPadding={12} buttonWidth={100} onPress={() => refreshMap()} text='Refresh Map' />
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
});
