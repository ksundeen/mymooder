import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { COUNTRIES } from '@/constants/CountryShapes';
import Svg, { G, Path, Circle } from "react-native-svg";
import * as d3 from "d3";
import { ScaledSize } from 'react-native';

export function ChartComponent(props: { dimensions: ScaledSize; }) {
    const { dimensions } = props;

    const [countryList, setCountryList] = useState([]);
    const mapExtent = useMemo(() => {
      return dimensions.width > dimensions.height / 2
         ? dimensions.height / 2 
         : dimensions.width;
   }, [dimensions]);

    const countryPaths = useMemo(() => {
        const projection = d3.geoAzimuthalEqualArea()
            .rotate([0, -90])
            .clipAngle(150)
            .fitSize([mapExtent,mapExtent], { type: "FeatureCollection", features: COUNTRIES})
            .translate([dimensions.width / 2, mapExtent / 2]);
    const geoPath = d3.geoPath().projection(projection);
    const svgPaths = COUNTRIES.map(geoPath);
    return svgPaths;
    }, [dimensions]);

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
                width={dimensions.width}
                height={dimensions.height / 2}
            >
                <G>
                <Circle
                    cx={dimensions.width / 2}
                    cy={mapExtent / 2}
                    r={mapExtent / 2}
                    fill={"#3b454f"}
                />
                {COUNTRIES.map((x: any) => x)}
                </G>
            </Svg>=
        </View>
    );
};

export default ChartComponent;