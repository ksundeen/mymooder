import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { COUNTRIES } from '@/assets/data/Countries';
import Svg, { G, Path, Circle } from "react-native-svg";
import * as d3 from 'd3';

export function ChartComponent(props: {width: number, height: number}) {
    const { width, height } = props;

    const [countryList, setCountryList] = useState([]);
    
    const mapExtent = useMemo(() => {
      return width > height / 2
         ? height / 2 
         : width;
   }, [width, height]);

    const countryPaths = useMemo(() => {
        const projection = d3.geoAzimuthalEqualArea()
            .rotate([0, -90])
            .clipAngle(150)
            .fitSize([mapExtent,mapExtent], { type: "FeatureCollection", features: COUNTRIES})
            .translate([width / 2, mapExtent / 2]);
    
            const geoPath = d3.geoPath().projection(projection);
    
            const svgPaths = COUNTRIES.map(geoPath);
    
            return svgPaths;
    }, [props.width, props.height]);

    useEffect(() => {
        setCountryList(
            countryPaths.map((path: string | undefined,i: string | number) => {
                return (
                <Path
                    key={COUNTRIES[i].properties.name}
                    d={path}
                    stroke={"#aaa"}
                    strokeOpacity={0.3}
                    strokeWidth={0.6}
                    fill={"#aaa"}
                    opacity={0.4} 
                />
                )
            }));
    }, []);

    return (
        <View>
            <Svg
                width={width}
                height={height / 2}
            >
                <G>
                <Circle
                    cx={width / 2}
                    cy={mapExtent / 2}
                    r={mapExtent / 2}
                    fill={"#3b454f"}
                />
                {countryList.map(x => x)}
                </G>
            </Svg>
        </View>
    );
};

export default ChartComponent;
