import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { favoritePlaceData } from '@/assets/data/favorite-places';
import Svg, { G, Path } from "react-native-svg";
import * as d3 from 'd3';
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

    const [happyPointList, setHappyPointList] = useState<string[]>([]);
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
        const colorScale = d3.scaleSequentialSymlog(d3.interpolateReds)
        //     .domain([0, maxHappyScoreY]);
            
        // const colorScale = d3.scaleLinear(["red", "blue"])
            // .domain([0, maxHappyScoreY])
            .domain([0, 10])
            .clamp(true)

        return colorScale;
    }, [])

    const toggleHappyPoints = () => {
        setHappyPointsVisibility(!happyPointsVisible);
    }

    const moodPointPaths: string[] = useMemo(() => {
        console.log('Data: ' + moodPointsGeojson)        
        console.log('MoodPointsGeojson.features: ' + JSON.stringify(moodPointsGeojson));

        // Mood Value Mood Points
        const projection = d3.geoMercator()
        // const projection = d3.geoAzimuthalEqualArea()
            // .rotate([0, -90])
            // .clipAngle(150)
            .fitSize([mapExtent,mapExtent], { type: "FeatureCollection", features: moodPointsGeojson.features})
            .translate([width / 2, mapExtent / 2]);

        const geoPath = d3.geoPath().projection(projection);
        const features: GeoJSON.Feature[] = moodPointsGeojson.features
        const svgPaths: string[] = features.map(geoPath);

        return svgPaths;
    }, [props.width, props.height]);

    // Return paths for mood points
    useEffect(() => {
        if (moodPointsGeojson) {
            setHappyPointList(
                moodPointPaths.map((path: string, i: number) => {
                    const curHappyScore = moodPointsGeojson.features[i].properties.happy_score;
                    // const isDataAvailable = curHappyScore.some(data: any => data.datetime === date);

                    return (
                    <Path
                        key={moodPointsGeojson.features[i].properties.index}
                        d={path}
                        // stroke={Colors.lightBlue}
                        strokeOpacity={0.3}
                        strokeWidth={0.6}
                        // strokeWidth={curHappyScore}
                        // fill={colorize(curHappyScore[dateIndex])}
                        fill={colorize(curHappyScore)}
                        // fill={Colors.lightGrey}
                        opacity={0.4} 
                    />
                    )
                }));
        }
    }, [props.width, props.height]); 

    return (
        <View style={styles.container}>
            <Svg
                width={width}
                height={height / 2}
            >
                <G>
                {happyPointsVisible ? happyPointList.map(x => x): ''}
                </G>
            </Svg>
            <ButtonComponent 
                buttonStyle={{opacity: 0.5}}
                onPress={toggleHappyPoints}
                text={"Toggle Points"}
            ></ButtonComponent> 
        </View>
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