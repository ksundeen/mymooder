// import React, {FC, useMemo, useState} from 'react';
// import {StyleSheet, SafeAreaView, View, Text, Pressable, Easing, Dimensions} from 'react-native';
// import Animated, {
//   useAnimatedProps,
//   useDerivedValue,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import {G, Line, Path, Svg} from 'react-native-svg';
// import {mixPath, ReText, Path as RePath} from 'react-native-redash';
// import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite';
// import { MoodValue, MoodValueNumber, ChartPointNumber } from '@/app/database/types';
// import { MoodLabels } from '@/app/constants/Values';
// import * as d3 from 'd3';
// import { MoodValueFieldDropdown } from '../MoodValueFieldDropdown';
// import { crudMoodValuesMethods } from '@/app/database/crudMethods';

// const { getAllMoodValues } = crudMoodValuesMethods();

// const {width} = Dimensions.get('screen');

// const CARD_WIDTH = width - 20;
// const GRAPH_WIDTH = CARD_WIDTH - 60;
// const CARD_HEIGHT = 325;
// const GRAPH_HEIGHT = 200;

// export type GraphData = {
//   max: number;
//   min: number;
//   curve: RePath;
// };

// type LineChartProps = {
//   height: number;
//   width: number;
//   leftPadding: number;
//   bottomPadding: number;
// };


// // const { width, height } = props;  
// const AnimatedPath = Animated.createAnimatedComponent(Path);
  
// export const LineChart: FC<LineChartProps> = ({
//     height,
//     width,
//     bottomPadding,
//     leftPadding,
//   }) => {
//     const db = useSQLiteContext();

//     const [allMoodValues, setAllMoodValues] = useState<MoodValue[]>([]);
//     const [chartData, setChartData] = useState<ChartPointNumber[]>([]);
//     const [selectedFieldName, setSelectedFieldname] = useState('happy_score')
//     const selectedGraph = useSharedValue(chartData);
//     const previousGraph = useSharedValue({...chartData});
//     const isAnimationComplete = useSharedValue(true);
//     const transition = useSharedValue(1);
  
//     const graphState = useState({
//       current: 0,
//       next: 1,  
//     });

//     // Example
//     // export const data: DataPoint[] = [
//     //   {date: '2000-02-01T05:00:00.000Z', value: 250},
//     //   {date: '2000-02-02T05:00:00.000Z', value: 300.35},
//     //   {date: '2000-02-03T05:00:00.000Z', value: 150.84},
//     // ];

//     useMemo(async () => {
//       setAllMoodValues(await getAllMoodValues(db))
//     }, []);

//     const translateIndex = (fieldName: string, _moodValue: MoodValue) => {
//       const val: number = _moodValue[fieldName as keyof typeof _moodValue]

//       // const valueTranslation: {calmness_score: number, happy_score: number, api_weather_temperature: number} = {
//       //   "calmness_score": moodValue.calmness_score,
//       //   "happy_score": moodValue.happy_score,
//       //   "api_weather_temperature": moodValue.api_weather_temperature,
//       // }

//       return val;
//     };

//     const changeNumberChartData = (selectedFieldName: string) => {
//       // [selectedFieldName as keyof typeof moodValue]
//       let _chartData: ChartPointNumber[] = []
//       allMoodValues.forEach(moodValue => {
//         const valueTranslation: {key: string, value: number}[] = [
//             {
//               key: "calmness_score",
//               value: moodValue.calmness_score
//             },
//             {
//               key: "happy_score",
//               value: moodValue.happy_score
//             },
//             {
//               key: "api_weather_temperature",
//               value: moodValue.api_weather_temperature
//             }
//           ]
        
//         // if (selectedFieldName in keys)
//         // const textTranslation: {
//         //   "latitude_x": moodValue.latitude_x,
//         //   "longitude_y": moodValue.longitude_y,
//         //   "name": moodValue.name,
//         //   "datetime": moodValue.datetime,
//         //   "people": moodValue.people,
//         //   "activities": moodValue.activities,
//         //   "personal_weather_rating": moodValue.personal_weather_rating,
//         //   "api_weather_rating":moodValue.api_weather_rating,
//         // }
//          _chartData.push({
//           date: moodValue.datetime,
//           value: valueTranslation.map(moodValMapping => {
//             if (moodValMapping.key === selectedFieldName) {
//               return moodValMapping.value
//             }
//           })
//         });
//       })
//       setChartData(_chartData)
//       onChartFieldChanged(_chartData)
//     };

//     const onChartFieldChanged = (newData: ChartPointNumber[]) => {
//       if (isAnimationComplete.value) {
//         isAnimationComplete.value = false;
//         transition.value = 0;
//         selectedGraph.value = newData;
  
//         transition.value = withTiming(1, {}, () => {
//           previousGraph.value = selectedGraph.value;
//           isAnimationComplete.value = true;
//         });
//       }
//     };
  
//     const makeNumberGraph = (data: ChartPointNumber[]) => {
//       const max = Math.max(...chartData.map(val => val.value));
//       const min = Math.min(...data.map(val => val.value));
//       const y = d3.scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35]);
    
//       const x = d3.scaleTime()
//         .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
//         .range([10, GRAPH_WIDTH - 10]);
    
//       const curvedLine = d3.line<ChartPointNumber>()
//         .x(d => x(new Date(d.date)))
//         .y(d => y(d.value))
//         .curve(d3.curveBasis)(data);
    
//       return {
//         max,
//         min,
//         curve: curvedLine!,
//       };
//     };

//     const graphData: GraphData[] = [makeNumberGraph(chartData)];


//     const animatedProps = useAnimatedProps(() => {
//       return {
//         d: mixPath(
//           transition.value,
//           previousGraph.value.curve,
//           selectedGraph.value.curve,
//         ),
//       };
//     });
    
//     const transitionStart = (end: number) => {
//       graphState.current = {
//         current: end,
//         next: graphState.current.current,
//       };
//       transition.current = 0;
//       runTiming(transition, 1, {
//         duration: 750,
//         easing: Easing.inOut(Easing.cubic),
//       });
//     };

//     const mostRecent = useDerivedValue(() => {
//       return `$${selectedGraph.value.mostRecent}`;
//     });
  
//     const happyValues = () => onChartFieldChanged(1);
//     const q2Tapped = () => onChartFieldChanged(2);
//     const q3Tapped = () => onChartFieldChanged(3);
//     const q4Tapped = () => onChartFieldChanged(4);

//     const currentChartLabel = MoodLabels.map(moodLabel => {
//       if (moodLabel.value === selectedFieldName) {
//         return moodLabel.label
//       }}
//     )
  
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.titleContainer}>
//           <Text style={styles.titleText}>DateTime X {currentChartLabel}</Text>
//           <ReText style={styles.priceText} text={mostRecent} />
//         </View>
//         <Animated.View style={styles.chartContainer}>
//           <Svg width={width} height={height} stroke="#6231ff">
//             <G y={-bottomPadding}>
//               <Line
//                 x1={leftPadding}
//                 y1={height}
//                 x2={width}
//                 y2={height}
//                 stroke={'#d7d7d7'}
//                 strokeWidth="1"
//               />
//               <Line
//                 x1={leftPadding}
//                 y1={height * 0.6}
//                 x2={width}
//                 y2={height * 0.6}
//                 stroke={'#d7d7d7'}
//                 strokeWidth="1"
//               />
//               <Line
//                 x1={leftPadding}
//                 y1={height * 0.2}
//                 x2={width}
//                 y2={height * 0.2}
//                 stroke={'#d7d7d7'}
//                 strokeWidth="1"
//               />
//               <AnimatedPath animatedProps={animatedProps} strokeWidth="2" />
//             </G>
//           </Svg>
//         </Animated.View>
//         <Pressable
//           onPress={() => transitionStart(0)}
//           style={styles.buttonStyle}>
//           <Text style={styles.textStyle}>Graph 1</Text>
//         </Pressable>
//         <Pressable
//           onPress={() => transitionStart(1)}
//           style={styles.buttonStyle}>
//           <Text style={styles.textStyle}>Graph 2</Text>
//         </Pressable>
//         <MoodValueFieldDropdown
//           changeChartDataCaller={changeNumberChartData}
//           setSelectedFieldnameCaller={setSelectedFieldname}
//         />
//       </SafeAreaView>
//     );
//   };

// const styles = StyleSheet.create({
//     container: {
//        flex: 1,
//        alignItems: 'center',
//        justifyContent: 'center',
//     //    backgroundColor: Colors.lightBlue
//     },
//     titleContainer: {

//     },
//     titleText: {},
//     priceText: {},
//     chartContainer: {},
//     buttonContainer: {
//       flexDirection: 'row',
//     },
//     buttonStyle: {
//       marginRight: 20,
//       backgroundColor: '#6231ff',
//       paddingVertical: 5,
//       paddingHorizontal: 20,
//       borderRadius: 10,
//     },
//     textStyle: {
//       color: 'white',
//       fontSize: 20,
//     },
// });
