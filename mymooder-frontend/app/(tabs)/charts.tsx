import { StyleSheet, View, Image } from 'react-native';
import ChartComponent from "@/app/components/charting/ChartComponent";
import { ChartPointNumber, MoodValue, NumberChart } from '@/app/database/types';
import { useMemo, useState } from 'react';
import { crudMoodValuesMethods } from '@/app/database/crudMethods';
import { useSQLiteContext } from 'expo-sqlite';
import ParallaxScrollView from '@/app/components/ParallaxScrollView';
const { getAllMoodValues } = crudMoodValuesMethods();

export default function Charts() {
   const [moodData, setMoodData] = useState<MoodValue[]>([])
   const [allGraphData, setAllGraphData] = useState<NumberChart[] | null>(null); 

   const db = useSQLiteContext();

   const refreshMoodData = async () => {
     setMoodData(await getAllMoodValues(db));
   };

   const sortDates = (moodData: MoodValue[]) => {
     const newArr: MoodValue[] = [...moodData]
     newArr.sort(function(a, b) {
       return (a.datetime < b.datetime) ? -1 : ((a.datetime > b.datetime) ? 1 : 0);
     })
     return newArr
   };

   const getMaxValues = (chartData: ChartPointNumber[]) => {
      const maxVal: number = Math.max(...chartData.map(dataPoint => dataPoint.value));
      return maxVal
   }

   const getMinValues = (chartData: ChartPointNumber[]) => {
      const minVal: number = Math.min(...chartData.map(dataPoint => dataPoint.value));
      return minVal
   }

   const getMaxEpochDates = (chartData: ChartPointNumber[]) => {
      const maxDateEpoch: Date = new Date(Math.max(...chartData.map(dataPoint => new Date(dataPoint.date).getTime())));
      return maxDateEpoch
    };

    const getMinEpochDates = (chartData: ChartPointNumber[]) => {
      const minDateEpoch: Date = new Date(Math.min(...chartData.map(dataPoint => new Date(dataPoint.date).getTime())));
      return minDateEpoch
    };

    const getFormattedDate = (date: Date) => {
      const month: number = date.getMonth()
      const day: number = date.getDay()
      // const year: number = date.getFullYear()
      const formattedDate: string = `${month}-${day}`//-${year}`
      return formattedDate
    };

   const createMoodGraphData = (moodData: MoodValue[]) => {
     const newMoodData: MoodValue[] = sortDates(moodData)
     
     let _chartHappyData: ChartPointNumber[] = []
     let _chartCalmData: ChartPointNumber[] = []
     let _chartTempData: ChartPointNumber[] = []

     newMoodData.forEach(moodValue => {
       if (moodValue.datetime && 
         moodValue.happy_score && 
         moodValue.calmness_score && 
         moodValue.api_weather_temperature) {
           _chartHappyData.push({
             date: moodValue.datetime,
             value: moodValue.happy_score,
             label: getFormattedDate(new Date(moodValue.datetime)),
             labelTextStyle: {color: 'lightgray', width: 60},
           });
           _chartCalmData.push({
             date: moodValue.datetime,
             value: moodValue.calmness_score,
             label: getFormattedDate(new Date(moodValue.datetime)),
             labelTextStyle: {color: 'lightgray', width: 60},
           });
           _chartTempData.push({
             date: moodValue.datetime,
             value: moodValue.api_weather_temperature,
             label: getFormattedDate(new Date(moodValue.datetime)),
             labelTextStyle: {color: 'lightgray', width: 60},
           });
         }
     });

     return [
         {
            name: "Happy (10) vs Sad (0) by Date",
            data: _chartHappyData, 
            maxDate: getMaxEpochDates(_chartHappyData), 
            minDate: getMinEpochDates(_chartHappyData),
            maxVal: getMaxValues(_chartHappyData),
            minVal: getMinValues(_chartHappyData)
         },
         {
            name: "Calm (10) vs Angry (0) by Date",
            data: _chartCalmData, 
            maxDate: getMaxEpochDates(_chartCalmData), 
            minDate: getMinEpochDates(_chartCalmData),
            maxVal: getMaxValues(_chartCalmData),
            minVal: getMinValues(_chartCalmData)
         },
         {
            name: "Temperature (°F) by Date",
            data: _chartTempData, 
            maxDate: getMaxEpochDates(_chartTempData), 
            minDate: getMinEpochDates(_chartTempData),
            maxVal: getMaxValues(_chartTempData),
            minVal: getMinValues(_chartTempData)
         }
     ]
   };
   
   useMemo(async () => {
      const _moodData = await getAllMoodValues(db)
      
      const _allGraphData = createMoodGraphData(_moodData)
      
      setAllGraphData(_allGraphData)
      setMoodData(_moodData)
   // console.log(JSON.stringify(_allGraphData))
    }, [moodData]);

   return (
      <ParallaxScrollView
         headerBackgroundColor={{ light: 'white', dark: 'white' }}
         headerImage={<Image source={require('@/assets/images/statistics-pixabay.jpg')} style={styles.headerImage}/>}
      >
         <View style={styles.container}>
            {allGraphData ?
               <ChartComponent 
                  allGraphData={allGraphData}
                  refreshMoodDataCaller={refreshMoodData}
               />
               : <></>
            }
         </View>
      </ParallaxScrollView>
      );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   headerImage: {
      position: 'relative',
      height: 250,
      width: 450,
    },
});