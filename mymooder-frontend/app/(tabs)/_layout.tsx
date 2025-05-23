import React, { Suspense, useEffect, useState } from 'react';
import { TabBarIcon } from '../components/navigation/TabBarIcon';
import { Colors } from '@/app/constants/Colors';
import { useColorScheme } from '@/app/hooks/useColorScheme';
import { AntDesign, FontAwesome, Fontisto } from '@expo/vector-icons';
import { ActivityIndicator, View, Text, StyleSheet, Pressable } from 'react-native';
// import { SQLiteProvider, SQLiteDatabase } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';
// import { Asset } from 'expo-asset';
// import * as FileSystem from "expo-file-system";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Charts from './charts';
import HomeScreen from './index';
import MoodComponent from './mood';
import { LocationValues } from '../database/types';
import MapEntry from './map';
// import initDatabaseIfNeeded from '../database/sqliteInit';

const Tab = createBottomTabNavigator();

// const loadDatabase = async () => {
//   const dbName = "mymooder.db";
//   const dbAsset = require("../../assets/mymooder.db");
//   const dbUri = Asset.fromModule(dbAsset).uri;
//   console.log('dbUri: ' + dbUri)

//   const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
//   console.log('dbFile ' + dbFilePath)

//   const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
//   console.log('fileInfo: ' + JSON.stringify(fileInfo))

//   if (!fileInfo.exists) {
//     await FileSystem.makeDirectoryAsync(
//       `${FileSystem.documentDirectory}SQLite`,
//       { intermediates: true }
//     );
//   await FileSystem.downloadAsync(dbUri, dbFilePath);
//   };


  // if (seedDb) {
  //   await initDatabase((dbAsset));
  // }
// };

export default function TabLayout() {
  // const [dbLoaded, setDbLoaded] = useState(false);
  // const [dataRequestStatus, setDataRequestStatus] = useState("Could Not Access")
  // const [buttonClicked, setButtonClicked] = useState(false);

  const colorScheme = useColorScheme();

  const [locationsFromMapToMood, setLocationsFromMapToMood] = useState<LocationValues | null>(null);

  // useEffect(() => {
    // const loadData = async () => {
    //   await loadDatabase()
    //     .then(() => setDbLoaded(true))
    //     .catch((e) => console.error(e));
    // }
    // loadData();
  // }, [dbLoaded]);
  
  // const onPressButton = async () => {
  //   setDataRequestStatus('Reloading...');
  //   setButtonClicked(true);
  //   await loadDatabase();
  // }

  // if (!dbLoaded)
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size={"large"} />
  //       <Text>{dataRequestStatus}</Text>
  //       <Pressable
  //         style={buttonClicked ? [styles.buttonClicked] : [styles.reloadButton]}
  //         onPress={onPressButton}>          
  //         <Text style={styles.textStyle}>Reload Data</Text>
  //       </Pressable>
  //     </View>
  //   );

  return (
    <NavigationContainer independent>
      <Suspense
        fallback={
          <View style={{ flex: 1 }}>
            <ActivityIndicator size={"large"} />
            <Text>Loading Database...</Text>
          </View>
        }
      >
        {/* When ready, add option to import a new or existing database to use instead of the seed data - https://stackoverflow.com/questions/59769593/accessing-physical-storage-of-expo-sqlite-database */}
        {/* <SQLite.SQLiteProvider databaseName="mymooder.db" onInit={initDatabaseIfNeeded} useSuspense> */}
        <SQLite.SQLiteProvider databaseName="mymooder.db" assetSource={{ assetId: require('../../assets/mymooder.db') }}>

          <Tab.Navigator
              initialRouteName="Index"
              screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
              }}
              // screenListeners={({ navigation }) => ({
              //   state: (e) => {
              //     // Do something with the state
              //     console.log('state changed', JSON.stringify(e.data));
            
              //     // Do something with the `navigation` object
              //     if (!navigation.canGoBack()) {
              //       console.log("we're on the initial screen");
              //     }
              //   },
              // })}
            >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                ),
                }}
            />

            <Tab.Screen
              name="Mood"
              children={(props: {route: any, navigation: any}) => 
                <MoodComponent 
                  {...props} 
                  locationsFromMapToMood={locationsFromMapToMood} 
                  setLocationsFromMapToMoodCaller={setLocationsFromMapToMood} 
                />
              }
              options={{
                tabBarLabel: 'Mood',
                tabBarIcon: ({ color, focused }) => (
                  <Fontisto name='smiley' size={20} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Charts"
              component={Charts}
              options={{
                tabBarLabel: 'Charts',
                tabBarIcon: ({ color, focused }) => (
                    <AntDesign name='dotchart' size={24} color={color} />
                  ),
              }}
            />
            <Tab.Screen
              name="Map"
              // component={Map}
              children={(props: {route: any, navigation: any}) => 
                <MapEntry
                  {...props} 
                  setLocationsFromMapToMoodCaller={setLocationsFromMapToMood} 
                />
              }
              options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color, focused }) => (
                    <FontAwesome name={focused ? 'map' : 'map-o'} size={24} color={color} />
                  ),
              }}
            />
            </Tab.Navigator>
        </SQLite.SQLiteProvider>
      </Suspense>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
 },
  reloadButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    bottom: 50,
    backgroundColor: Colors.lightBlue
  },
  buttonClicked: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    bottom: 50,
    backgroundColor: Colors.lightGrey
  },
  textStyle: {
    color: 'balck',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});