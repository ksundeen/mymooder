// import RNPickerSelect from 'react-native-picker-select';
// import { MoodLabels } from '../../constants/Values';

// export const MoodValueFieldDropdown = ({setSelectedFieldnameCaller, changeChartDataCaller}: 

//       // const changeNumberChartData = (selectedFieldName: string) => {
//     //     // [selectedFieldName as keyof typeof moodValue]
//     //     let _chartData: ChartPointNumber[] = []
//     //     allMoodValues.forEach(moodValue => {
//     //       const valueTranslation: {key: string, value: number}[] = [
//     //           {
//     //             key: "calmness_score",
//     //             value: moodValue.calmness_score
//     //           },
//     //           {
//     //             key: "happy_score",
//     //             value: moodValue.happy_score
//     //           },
//     //           {
//     //             key: "api_weather_temperature",
//     //             value: moodValue.api_weather_temperature
//     //           }
//     //         ]
          
//     //       // if (selectedFieldName in keys)
//     //       // const textTranslation: {
//     //       //   "latitude_x": moodValue.latitude_x,
//     //       //   "longitude_y": moodValue.longitude_y,
//     //       //   "name": moodValue.name,
//     //       //   "datetime": moodValue.datetime,
//     //       //   "people": moodValue.people,
//     //       //   "activities": moodValue.activities,
//     //       //   "personal_weather_rating": moodValue.personal_weather_rating,
//     //       //   "api_weather_rating":moodValue.api_weather_rating,
//     //       // }
//     //        _chartData.push({
//     //         date: moodValue.datetime,
//     //         value: valueTranslation.map(moodValMapping => {
//     //           if (moodValMapping.key === selectedFieldName) {
//     //             return moodValMapping.value
//     //           }
//     //         })
//     //       });
//     //     })
//     //     setChartData(_chartData)
//     //     onChartFieldChanged(_chartData)
//     //   };
    
//   {setSelectedFieldnameCaller: Function, changeChartDataCaller: Function}) => {

//   return (
//     <RNPickerSelect
//       onValueChange={(value: string) => {
//         setSelectedFieldnameCaller(value)
//         changeChartDataCaller(value)
//         console.log(value)
//       }}
//       items={MoodLabels}
//     />
//   );
// };