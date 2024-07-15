import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { Countries } from '@/assets/data/Countries';
import { favoritePlaceData } from '@/assets/data/favorite-places';
import Svg, { G, Path, Circle } from "react-native-svg";
import * as d3 from 'd3';
import { Colors } from '@/app/constants/Colors';
import GeoJSON from 'geojson'
import ButtonComponent from './ButtonComponent';

type PropertiesType = {
    index: number,
    name: string,
    datetime: string,
    calmness_score: number,
    happy_score: number,
    people: string[],
    activities: string[],
    personal_weather_rating: string[],
    api_weather_rating: string[],
    api_weather_temperature: number,
    notes: string
};
type GeometryType = {
    type: GeoJSON.Point
    coordinates: [GeoJSON.Position, GeoJSON.Position]
};
type FeaturesType = {
    type: GeoJSON.Feature,
    geometry: GeometryType
    properties: PropertiesType
};
type FeatureCollectionType = {
    type: GeoJSON.FeatureCollection,
    features: FeaturesType[]
};

export function ChartComponent(props: {width: number, height: number}) {
    const { width, height } = props;

    const [countryList, setCountryList] = useState<string[]>([]);
    const [happyPointList, setHappyPointList] = useState<JSX.Element[]>([]);
    const [happyPointsVisible, setHappyPointsVisibility] = useState(true);

    let moodPointsGeojson: any = favoritePlaceData

    const mapExtent = useMemo(() => {
      return width > height / 2
         ? height / 2 
         : width;
    }, [width, height]);

    // const maxHappyScoreY = useMemo(() => {
    //     return d3.max(moodPointsGeojson.features, (moodValuesFeature: FeaturesType) =>
    //         d3.max(moodValuesFeature.properties, (d: PropertiesType) => d["happy_score"])
    //     );
    // }, [moodPointsGeojson.features]);

    const colorize = useMemo(() => {
        // const colorScale = d3.scaleSequentialSymlog(d3.interpolateReds)
        //     .domain([0, maxHappyScoreY]);
            
        const colorScale = d3.scaleLinear(["red", "blue"])
            // .domain([0, maxHappyScoreY])
            .domain([0, 10])
            .clamp(true)

        return colorScale;
    }, [])

    const toggleHappyPoints = () => {
        setHappyPointsVisibility(!happyPointsVisible);
    }

    // Retrieve only happy_score mood values
    // const allHappyScoreValues = MoodPoints.map((x: MoodTypeFeature["properties"]) => x.happy_score)

    // Original Countries using Azimuthal Equal Area projection
    const countryPaths = useMemo(() => {
        // const projection = d3.geoNaturalEarth1()
        const projection = d3.geoAzimuthalEqualArea()
            .rotate([0, -90])
            .clipAngle(150)
            .fitSize([mapExtent,mapExtent], { type: "FeatureCollection", features: Countries})
            .translate([width / 2, mapExtent / 2]);
    
        const geoPath = d3.geoPath().projection(projection);

        const svgPaths = Countries.map(geoPath);

        return svgPaths;
    }, [props.width, props.height]);

    const moodPointPaths: string[] = useMemo(() => {
        // console.log('Data: ' + moodPointsGeojson)        
        // console.log('MoodPointsGeojson.features: ' + JSON.stringify(moodPointsGeojson));

        // Mood Value Mood Points
        const projection = d3.geoNaturalEarth1()
        // const projection = d3.geoAzimuthalEqualArea()
            // .rotate([0, -90])
            // .clipAngle(150)
            .fitSize([mapExtent,mapExtent], { type: "FeatureCollection", features: moodPointsGeojson.features})
            .translate([width / 2, mapExtent / 2]);

        const geoPath = d3.geoPath().projection(projection);
        const features: any = moodPointsGeojson.features
        const svgPaths: string = features.map(geoPath);
        // console.log(`features: ${JSON.stringify(features)}`);
        // console.log(svgPaths);
        return svgPaths;
    }, [props.width, props.height]);

    // Return paths for mood points
    useEffect(() => {
        const newHappyPointList: JSX.Element[] = moodPointPaths.map((path: string, i: number) => {
            const curHappyScore = moodPointsGeojson.features[i].properties.happy_score;
            const curIndex = moodPointsGeojson.features[i].properties.index;
            // const isDataAvailable = curHappyScore.some(data: any => data.datetime === date);
            return (
                <Path
                    key={curIndex}
                    d={path}
                    // stroke={Colors.lightBlue}
                    strokeOpacity={0.3}
                    strokeWidth={0.6}
                    // strokeWidth={curHappyScore}
                    // fill={colorize(curHappyScore[dateIndex])}
                    fill={colorize(curHappyScore)}
                    // fill={Colors.lightGrey}
                    opacity={0.4} />
            );
        });

        setHappyPointList(newHappyPointList);
    }, [props.width, props.height]); 

    // Return paths for countries
    useEffect(() => {
        setCountryList(
            countryPaths.map((path: string, i: number) => {
                return (
                <Path
                    key={Countries[i].properties.name}
                    d={path}
                    stroke={Colors.lightGrey}
                    strokeOpacity={0.3}
                    strokeWidth={0.6}
                    fill={Colors.lightGrey}
                    opacity={0.4} 
                />
                )
            }));
    }, []); 

    return (
        // <View style={styles.container}>
            <Svg
                width={width}
                height={height / 2}
            >
                {/* <G> */}
                {/* Background world fill */}
                {/* <Circle
                    cx={width / 2}
                    cy={mapExtent / 2}
                    r={mapExtent / 2}
                    fill={"#3b454f"}
                /> */}
                {/* World shapes */}
                {/* {countryList.map(x => x)}
                {happyPointsVisible ? happyPointList.map(x => x): ''} */}
                {/* </G> */}
            </Svg>
            // {/* <ButtonComponent 
            //     buttonStyle={{opacity: 0.5}}
            //     onPress={toggleHappyPoints}
            //     text={"Toggle Points"}
            // ></ButtonComponent>  */}
        // </View>
    );
};

export default ChartComponent;

const styles = StyleSheet.create({
    container: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
    //    backgroundColor: Colors.lightBlue
    }
 });